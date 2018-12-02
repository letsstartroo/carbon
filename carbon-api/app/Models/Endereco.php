<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class endereco
 */
class Endereco extends Model
{
    protected $table = 'endereco';

    public function ocorrencia()
    {
        return $this->belongsTo('App\Models\Ocorrencia');
    }
}