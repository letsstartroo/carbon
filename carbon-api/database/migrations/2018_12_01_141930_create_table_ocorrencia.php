<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableOcorrencia extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('agravante', function (Blueprint $table) {
            $table->increments('id');
            $table->string("nome");
            $table->integer("agravante_pai_id")->nullable();
            $table->timestamps();
        });

        Schema::create('tipo_veiculo', function (Blueprint $table) {
            $table->increments('id');
            $table->string("nome");
            $table->timestamps();
        });

        Schema::create('natureza_evento', function (Blueprint $table) {
            $table->increments('id');
            $table->string("nome");
            $table->timestamps();
        });

        Schema::create('endereco', function (Blueprint $table) {
            $table->increments('id');
            $table->string("logradouro")->nullable();
            $table->string("bairro")->nullable();
            $table->string("cidade")->nullable();
            $table->string("estado")->nullable();
            $table->string("numero")->nullable();
            $table->string("ponto_referencia")->nullable();
            $table->integer("ocorrencia_id")->nullable();
            $table->timestamps();
        });

        Schema::create('situacao_vitima', function (Blueprint $table) {
            $table->increments('id');
            $table->string("nome");
            $table->timestamps();
        });

        Schema::create('local_fato', function (Blueprint $table) {
            $table->increments('id');
            $table->string("nome");
            $table->timestamps();
        });

        Schema::create('causa', function (Blueprint $table) {
            $table->increments('id');
            $table->string("nome");
            $table->timestamps();
        });

        Schema::create('ocorrencia', function (Blueprint $table) {
            $table->increments('id');
            $table->string("protocolo")->nullable();
            $table->string("latitude")->nullable();
            $table->string("longitude")->nullable();
            $table->integer("local_fato_id")->nullable();
            $table->integer("causa_id")->nullable();
            // $table->foreign('agravante_id')->references('id')->on('agravante'); 
            $table->timestamps();
        });

        Schema::create('ocorrencia_agravante', function (Blueprint $table) {
            $table->increments('id'); 
            $table->integer("ocorrencia_id");
            $table->integer("agravante_id");
            $table->timestamps();
        });

        Schema::create('veiculo', function (Blueprint $table) {
            $table->increments('id');
            $table->string("placa");
            $table->integer("ocorrencia_id");
            // $table->foreign('ocorrencia_id')->references('id')->on('ocorrencia'); 
            $table->integer("tipo_veiculo_id");
            // $table->foreign('tipo_veiculo_id')->references('id')->on('tipo_veiculo'); 
            $table->timestamps();
        });
 
        Schema::create('vitima', function (Blueprint $table) {
            $table->increments('id');
            $table->string("nome")->nullable();
            $table->string("sexo")->nullable();
            $table->string("data_nascimento")->nullable();
            $table->integer("situacao_vitima_id")->nullable(); 
            $table->integer("ocorrencia_id"); 
            // $table->foreign('ocorrencia_id')->references('id')->on('ocorrencia'); 
            $table->timestamps();
        });

        Schema::create('evento', function (Blueprint $table) {
            $table->increments('id');
            $table->string("latitude");
            $table->string("longitude");
            $table->string("descricao")->nullable();
            $table->string("anexo")->nullable();
            $table->string("tipo_anexo")->nullable();
            $table->integer("is_mirim")->default(0);
            $table->string("cpf")->nullable();
            $table->string("natureza_evento_id")->nullable();
            // $table->foreign('usuario_id')->references('id')->on('usuario'); 
            // $table->foreign('natureza_denuncia_id')->references('id')->on('natureza_denuncia'); 
            $table->timestamps();
        });

        Schema::create('ocorrencia_evento', function (Blueprint $table) {
            $table->increments('id'); 
            $table->integer("ocorrencia_id");
            $table->integer("evento_id");
            $table->timestamps();
        });

        Schema::create('ocorrencia_anexo', function (Blueprint $table) {
            $table->increments('id'); 
            $table->integer("ocorrencia_id");
            $table->string("anexo");
            $table->string("tipo_anexo");
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ocorrencia');
    }
}
