<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => ['cors']], function() {

    Route::get("estatistica/participacao-hoje", "EstatisticaController@particiacaoHoje");
    Route::get("estatistica/evolucao-acidente", "EstatisticaController@evolucaoAcidente");
    Route::get("estatistica/ocorrencia-mes", "EstatisticaController@mes");
    Route::get("estatistica/ocorrencia-morte-24h", "EstatisticaController@comMortesUltimas24Horas");
    Route::get("estatistica/ocorrencias/localizacao", "EstatisticaController@localizacaoOcorrencias");
    
    
    Route::get("arquivo/anexos/{name}", "ArquivoController@preview");

    Route::post("upload/audio-ios", "ArquivoController@audioIos");
    Route::post("upload/audio-android", "ArquivoController@audioAndroid");
    Route::post("upload", "ArquivoController@store");

    Route::resource("ocorrencia", "OcorrenciaController", ["only" => ['store', 'index', 'show']]);
    Route::resource("evento", "EventoController", ["only" => ['store', 'index', 'show']]);

});