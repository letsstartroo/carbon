<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table("agravante")->insert(
            [
                [
                    "id" => 1,
                    "nome" => "Fatores humanos",
                    "agravante_pai_id" => null
                ],
                [
                    "id" => 2,
                    "nome" => "Fatores naturais",
                    "agravante_pai_id" => null
                ],
                [
                    "id" => 3,
                    "nome" => "Fatores estruturais",
                    "agravante_pai_id" => null
                ], 
                [
                    "id" => 4,
                    "nome" => "Sono",
                    "agravante_pai_id" => 1
                ],
                [
                    "id" => 5,
                    "nome" => "Fadiga",
                    "agravante_pai_id" => 1
                ],
                [
                    "id" => 6,
                    "nome" => "Embriagues",
                    "agravante_pai_id" => 1
                ],
                [
                    "id" => 7,
                    "nome" => "Imprudência",
                    "agravante_pai_id" => 1
                ],
                [
                    "id" => 8,
                    "nome" => "Chuva",
                    "agravante_pai_id" => 2
                ],
                [
                    "id" => 9,
                    "nome" => "Baixa visibilidade",
                    "agravante_pai_id" => 2
                ], 
                [
                    "id" => 10,
                    "nome" => "Má sinalização",
                    "agravante_pai_id" => 3
                ], 
                [
                    "id" => 11,
                    "nome" => "Más condiçōes da via",
                    "agravante_pai_id" => 3
                ], 
            ]
        );

        DB::table("natureza_evento")->insert(
            [
                [
                    "id" => 1,
                    "nome" => "Acidente"
                ],
                [
                    "id" => 2,
                    "nome" => "Irregularidades"
                ],
                [
                    "id" => 3,
                    "nome" => "Melhoria na via"
                ],
            ]
        );

        DB::table("local_fato")->insert(
            [
                [
                    "id" => 1,
                    "nome" => "Via pública"
                ],
                [
                    "id" => 2,
                    "nome" => "Garagem coletiva de prédio"
                ],
                [
                    "id" => 3,
                    "nome" => "Estacionamento com vigilância"
                ],
                [
                    "id" => 4,
                    "nome" => "Estacionamento público"
                ],
                [
                    "id" => 5,
                    "nome" => "Estacionamento particular"
                ],
                [
                    "id" => 6,
                    "nome" => "Garagem ou abrigo de residência"
                ]
            ]
        );

        DB::table("causa")->insert(
            [
                [
                    "id" => 1,
                    "nome" => "Atropelamento"
                ],
                [
                    "id" => 2,
                    "nome" => "Capotamento"
                ],
                [
                    "id" => 3,
                    "nome" => "Queda de moto"
                ],
                [
                    "id" => 4,
                    "nome" => "Colisão de veículos"
                ],
                [
                    "id" => 5,
                    "nome" => "Estacionamento particular"
                ],
                [
                    "id" => 6,
                    "nome" => "Garagem ou abrigo de residência"
                ]
            ]
        );

        DB::table("situacao_vitima")->insert(
            [
                [
                    "id" => 1,
                    "nome" => "Sem lesão"
                ],
                [
                    "id" => 2,
                    "nome" => "Levemente ferido"
                ],
                [
                    "id" => 3,
                    "nome" => "Gravemente ferido"
                ],
                [
                    "id" => 4,
                    "nome" => "Morte emediata"
                ]
            ]
        );

        DB::table("tipo_veiculo")->insert(
            [
                [
                    "id" => 1,
                    "nome" => "Automóvel de passeio / Utilitário"
                ],
                [
                    "id" => 2,
                    "nome" => "Motocicleta"
                ],
                [
                    "id" => 3,
                    "nome" => "Bicicleta"
                ],
                [
                    "id" => 4,
                    "nome" => "Ônibus"
                ],
                [
                    "id" => 5,
                    "nome" => "Caminhão"
                ], 
                [
                    "id" => 6,
                    "nome" => "Veículo agricola"
                ],
                [
                    "id" => 7,
                    "nome" => "Propulsão humana"
                ],
                [
                    "id" => 8,
                    "nome" => "Tração animal"
                ]
            ]
        );
    }
}
