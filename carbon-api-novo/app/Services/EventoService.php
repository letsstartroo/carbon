<?php

namespace App\Services;

use App\Models\Ocorrencia;
use App\Models\Evento;

class EventoService 
{

    public function vincularOcorrencia(Evento $evento)
    {

        $ocorrencias = Ocorrencia::selectRaw("id");
        
        $ocorrencias->where("latitude", "<>", "");
        $ocorrencias->where("longitude", "<>", "");

        $ocorrencias->whereRaw("
            ST_Distance_Sphere(
                POINT(ocorrencia.latitude, ocorrencia.longitude), 
                POINT($evento->latitude, $evento->longitude)
            ) <= " . config("app.distance_event"));

        $ocorrencias->whereRaw("HOUR( TIMEDIFF(created_at, '$evento->created_at')) <= ".config("app.time_diff_event")." AND 
                              HOUR( TIMEDIFF(created_at, '$evento->created_at')) >= -".config("app.time_diff_event"));

        $ocorrencias = $ocorrencias->get();

        foreach($ocorrencias as $val)
        {
            $evento->ocorrencias()->sync($val->id);
        }
        
        return $ocorrencias;
    }
}