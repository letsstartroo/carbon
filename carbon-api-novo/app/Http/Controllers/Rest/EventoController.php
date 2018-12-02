<?php

namespace App\Http\Controllers\Rest;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request; 
use App\Models\Evento;
use App\Models\Vitima;
use App\Models\Veiculo;
use App\Services\EventoService;
use Geocoder;

class EventoController extends Controller
{
    public function index(Request $request) 
    {
        return Evento::orderBy("created_at", "DESC")->get()->load("naturezaEvento");
    }

    public function store(Request $request) 
    {
        $evento = new Evento;
 
        $evento->latitude = $request->latitude;
        $evento->longitude = $request->longitude;
        $evento->descricao = $request->descricao;
        $evento->cpf = $request->cpf;
        $evento->natureza_evento_id = $request->natureza_evento_id;
        $evento->anexo = $request->anexo;
        
        if($request->anexo) 
        {
            $arr = explode(".", $request->anexo);
            $evento->tipo_anexo = end($arr);
        }
 
        $evento->save();


        // Logica para vincular evento a ocorrencia
        $eventoService = new EventoService();
         
        $eventoService->vincularOcorrencia($evento);

        $evento->load("ocorrencias");

        return [
            "type" => "success",
            "data" => $evento
        ];
    }

    public function show($id, Request $request) 
    {
        return Evento::find($id)->load("naturezaEvento");
    }
}
