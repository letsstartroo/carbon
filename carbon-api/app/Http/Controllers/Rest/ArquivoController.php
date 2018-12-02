<?php

namespace App\Http\Controllers\Rest;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request; 
use App\Models\Evento;
use App\Models\Vitima;
use App\Models\Veiculo;
use Response;

class ArquivoController extends Controller
{
    public function store(Request $request) 
    {
        $upload = $request->anexo->store('anexos'); 
 
        return [
            "type" => "success",
            "data" => $upload
        ];
    }

    public function audioIos(Request $request) 
    {
        $upload = $request->anexo->store('anexos');
        
        $full_path = storage_path('app') . "/" . $upload;

        rename($full_path, $full_path . ".caf");

        $full_path .= ".caf";

        $ffmpeg = \FFMpeg\FFMpeg::create();

        $audio = $ffmpeg->open($full_path);


        $audio_mp3 = new \FFMpeg\Format\Audio\Mp3();
        
        //ffmpeg -i sound.caf sound.wav
        $audio->save($audio_mp3, storage_path('app') . "/" . $upload . ".mp3");


        unlink($full_path);

 
        return [
            "type" => "success",
            "data" =>  $upload . ".mp3"
        ];
    }

    public function audioAndroid(Request $request) 
    {
        $upload = $request->anexo->store('anexos');
        
        $full_path = storage_path('app') . "/" . $upload;

        rename($full_path, $full_path . ".3gp");

        $full_path .= ".3gp";

        $ffmpeg = \FFMpeg\FFMpeg::create();

        $audio = $ffmpeg->open($full_path);


        $audio_mp3 = new \FFMpeg\Format\Audio\Mp3();
        
        //ffmpeg -i sound.caf sound.wav
        $audio->save($audio_mp3, storage_path('app') . "/" . $upload . ".mp3");

        unlink($full_path);
 
        return [
            "type" => "success",
            "data" => $upload . ".mp3"
        ];
    }

    public function preview($name, Request $request) 
    {
        $full_path = storage_path('app') . "/anexos/" . $name;
        
        $extension = explode(".", $full_path);

        $extension = end($extension);
        
        $contentType = 'application/pdf';

        if($extension == "jpeg" || 
            $extension == "jpg" || 
            $extension == "png" ||
            $extension == "git" )
        {
            $contentType = "image/jpeg";
        }

        if($extension == "mp3")
        {
            $contentType = "audio/mpeg";
        }

        if($extension == "mp4")
        {
            $contentType = "video/mp4";
        }
        
        return Response::make(file_get_contents($full_path), 200, [
            'Content-Type' => $contentType
        ]);
    }
}
