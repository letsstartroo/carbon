<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class ocorrencia_anexo
 */
class OcorrenciaAnexo extends Model
{
    protected $table = 'ocorrencia_anexo';

    public function ocorrencia()
    {
        return $this->belongsTo('App\Models\Ocorrencia');
    }
}