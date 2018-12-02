<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Agravante
 */
class Agravante extends Model
{
    protected $table = 'agravante';

    public function ocorrencias()
    {
        return $this->belongsToMany('App\Models\Agravante', "ocorrencia_agravante");
    }

}