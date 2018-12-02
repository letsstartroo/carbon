<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Vitima
 */
class Vitima extends Model
{
    protected $table = 'vitima';

    public function ocorrencia()
    {
        return $this->belongsTo('App\Models\Ocorrencia');
    }
}