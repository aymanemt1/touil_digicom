<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::unprepared('
        CREATE TRIGGER update_capacity_new AFTER INSERT ON reservations
        FOR EACH ROW
        BEGIN
            DECLARE reservation_valid BOOLEAN;
            SELECT validate INTO reservation_valid FROM reservations WHERE id = NEW.id;
    
            IF reservation_valid THEN
                UPDATE formations SET capacite = capacite - 1 WHERE id = NEW.formation_id;
            END IF;
        END;
        ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('_update_capacite_new');
    }
};
