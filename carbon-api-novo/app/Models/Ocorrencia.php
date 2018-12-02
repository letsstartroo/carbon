<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Ocorrencia
 */
class Ocorrencia extends Model
{
    protected $table = 'ocorrencia';

    public function vitima()
    {
        return $this->hasMany('App\Models\Vitima');
    }

    public function veiculo()
    {
        return $this->hasMany('App\Models\Veiculo');
    }

    public function anexo()
    {
        return $this->hasMany('App\Models\OcorrenciaAnexo');
    }

    public function endereco()
    {
        return $this->hasOne('App\Models\Endereco');
    }

    public function causa()
    {
        return $this->belongsTo('App\Models\Causa');
    }

    public function localFato()
    {
        return $this->belongsTo('App\Models\LocalFato');
    }

    public function agravantes()
    {
        return $this->belongsToMany('App\Models\Agravante', "ocorrencia_agravante");
    }

    public function eventos()
    {
        return $this->belongsToMany('App\Models\Evento', "ocorrencia_evento");
    }
}