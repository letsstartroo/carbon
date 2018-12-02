<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Evento
 */
class Evento extends Model
{
    protected $table = 'evento';
 
    public function ocorrencias()
    {
        return $this->belongsToMany('App\Models\Ocorrencia', "ocorrencia_evento");
    }

    public function naturezaEvento()
    {
        return $this->belongsTo('App\Models\NaturezaEvento');
    }
}