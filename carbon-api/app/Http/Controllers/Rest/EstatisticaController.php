<?php

namespace App\Http\Controllers\Rest;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request; 
use App\Models\Ocorrencia;
use App\Models\Evento;

class EstatisticaController extends Controller
{
    public function mes(Request $request) 
    {
        return Ocorrencia::whereRaw("MONTH(created_at) = MONTH(NOW()) AND YEAR(created_at) AND YEAR(NOW())")->count();
    }

    public function comMortesUltimas24Horas(Request $request) 
    {
        return Ocorrencia::whereRaw("(created_at >= (NOW() - INTERVAL 1 DAY)) AND (created_at <= NOW())")->count();
    }


    public function evolucaoAcidente(Request $request) 
    {
        $response = [
            [],
            []
        ];

        for($i = 0; $i < 12; $i++)
        {
            $response[0][] = Ocorrencia::whereRaw("MONTH(created_at) = " .($i+1). " AND YEAR(created_at) AND 2017")->count();
            $response[1][] = Ocorrencia::whereRaw("MONTH(created_at) = " .($i+1). " AND YEAR(created_at) AND 2018")->count();

        }   

        return $response;
    }


    
    public function particiacaoHoje()
    {
        return Evento::whereRaw("DATE(created_at) = DATE(NOW())")->count();
    }

    public function localizacaoOcorrencias(Request $request) 
    {
        $query = Ocorrencia::selectRaw("latitude, longitude, v.sexo, v.situacao_vitima_id");

        $query->leftJoin("vitima AS v", "v.ocorrencia_id", "=", "ocorrencia.id");

        $query->where("latitude", "<>", "");


        if($request->tipo_veiculo_id) 
        {
            $query->join("veiculo AS v", "v.ocorrencia_id", "=", "ocorrencia.id");
            $query->where("v.tipo_veiculo_id", $request->tipo_veiculo_id);
        }

        if($request->agravante_id) 
        {
            $query->join("ocorrencia_agravante AS oa", "oa.ocorrencia_id", "=", "ocorrencia.id");
            $query->where("oa.agravante_id", $request->agravante_id);
        }

        if($request->causa_id) 
        {
            $query->where("ocorrencia.causa_id", $request->causa_id);
        }

        if($request->situacao_vitima_id) 
        {
            $query->where("v.situacao_vitima_id", $request->situacao_vitima_id);
        }

        if($request->sexo) 
        {
            $query->where("v.sexo", $request->sexo);
        }

        if($request->data_inicial) 
        {
            $query->where("ocorrencia.created_at", ">=", $request->data_inicial);
        }

        if($request->data_final)
        {
            $query->where("ocorrencia.created_at", "<=", $request->data_final);
        }

        return $query->get();
    }
}
