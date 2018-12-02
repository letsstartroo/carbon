<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class veiculo
 */
class Veiculo extends Model
{
    protected $table = 'veiculo';

    public function ocorrencia()
    {
        return $this->belongsTo('App\Models\Ocorrencia');
    }

    public function tipoVeiculo()
    {
        return $this->belongsTo('App\Models\TipoVeiculo');
    }
}