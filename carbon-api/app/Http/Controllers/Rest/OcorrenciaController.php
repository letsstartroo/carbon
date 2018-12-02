<?php

namespace App\Http\Controllers\Rest;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request; 
use App\Models\Ocorrencia;
use App\Models\OcorrenciaAnexo;
use App\Models\Vitima;
use App\Models\Veiculo;
use App\Models\Agravante;
use App\Models\Endereco;
use Geocoder;
use DB;

class OcorrenciaController extends Controller
{
    public function index(Request $request) 
    {
        $query  = Ocorrencia::selectRaw("(SELECT COUNT(*) as total FROM vitima WHERE vitima.ocorrencia_id = ocorrencia.id) AS total_vitimas, ocorrencia.*")
                    ->orderBy("created_at", "DESC")
                    ->get();

        return $query->load("causa")
                     ->load("localFato");
    }

    public function store(Request $request) 
    {
        $ocorrencia = new Ocorrencia;

        DB::beginTransaction();

        try 
        {
            $lat ="";
            $lng = "";

            if( empty($request->latitude) && empty($request->longitude) && $request->endereco ) 
            {
                /*
                $endereco = "";

                if(isset($request->endereco['logradouro']))
                {
                    $endereco .= $request->endereco['logradouro'];
                }

                if(isset($request->endereco['numero']))
                {
                    $endereco .= " " . $request->endereco['numero'] . " , ";
                }

                if(isset($request->endereco['bairro']))
                {
                    $endereco .= $request->endereco['bairro'] . " ,";
                }

                $endereco .= " Rondonópolis - MT, Brazil";
    
                try 
                {

                    $enderecoGoogle = (object) Geocoder::getCoordinatesForAddress( $endereco );

                    if( $enderecoGoogle )
                    {
                        $lat = $enderecoGoogle->lat;
                        $lng = $enderecoGoogle->lng;
                    }
                }
                catch(CloudNotGeocode $e) 
                {

                } */
            }

            if(isset($request->latitude))
            {
                $lat = $request->latitude;
                $lng = $request->longitude;
            }

            $ocorrencia->latitude = $lat;
            $ocorrencia->longitude = $lng;
            $ocorrencia->protocolo = $request->protocolo;
            $ocorrencia->causa_id = $request->causa_id;
            $ocorrencia->local_fato_id = $request->local_fato_id;
            $ocorrencia->save();

            if(isset($request->latitude))
            {/*
                try 
                {
                    $enderecoGoogle = (object) Geocoder::getAddressForCoordinates($request->latitude, $request->longitude);

                    $arrEndereco = explode(",", $enderecoGoogle->formatted_address);

                    $endereco = new Endereco;
                    $endereco->logradouro = $arrEndereco[0];
                    $endereco->cidade = $arrEndereco[1]; 
                    $endereco->ocorrencia_id = $ocorrencia->id;
                    $endereco->save();

                }
                catch(CloudNotGeocode $e) 
                {

                }*/
            }

            // Salva as vitimas da ocorrencia
            if( $request->vitimas )
            { 
                foreach( $request->vitimas as $val)
                {
                    $val = (object) $val;

                    $vitima = new Vitima();
                    $vitima->nome = @$val->nome;
                    $vitima->sexo = @$val->sexo;
                    $vitima->situacao_vitima_id = @$val->situacao_vitima_id;
                    $vitima->data_nascimento = @$val->data_nascimento;

                    $ocorrencia->vitima()->save($vitima);
                } 
            }

            // Salva os veiculso envolvidos na ocorrencia
            if( $request->veiculos )
            { 
                foreach( $request->veiculos as $val)
                {
                    $val = (object) $val;

                    $veiculo = new Veiculo;
                    $veiculo->placa             = $val->placa;
                    $veiculo->tipo_veiculo_id   = $val->tipo_veiculo_id; 
    
                    $ocorrencia->veiculo()->save($veiculo);
                }
            }
            
            if( $request->anexos )
            { 
                foreach( $request->anexos as $val)
                {

                    $file = (string) $val;

                    $anexo = new OcorrenciaAnexo;
                    $anexo->anexo      = $val; 
    
                    $arr = (explode(".", $file));

                    $anexo->tipo_anexo = end($arr);
                
                    $ocorrencia->anexo()->save($anexo);
                }
            } 
    
            if( $request->agravantes )
            {  
                $ocorrencia->agravantes()->sync($request->agravantes);
            } 


            DB::commit();

            return [
                "type" => "success",
                "data" => $ocorrencia
            ];

        }
        catch(Exception $e)
        {   
            DB::rollBack();

            return [
                "type" => "error",
                "message" => $e->getMessage()
            ];
        }
    }

    public function show($id, Request $request) 
    {
        return Ocorrencia::find($id)
                ->load("causa")
                ->load("localFato")
                ->load("vitima")
                ->load("veiculo")
                ->load("agravantes")
                ->load("eventos")
                ->load("endereco")
                ->load("anexo");
    }
}
