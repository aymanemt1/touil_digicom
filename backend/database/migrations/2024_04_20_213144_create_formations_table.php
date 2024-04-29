<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('formations', function (Blueprint $table) {
            $table->id();
            $table->string('titre_fr');
            $table->string('titre_ar')->default('');
            $table->text('description_fr');
            $table->text('description_ar')->default('');
            $table->integer('duree');
            $table->dateTime('date_debut');
            $table->dateTime('date_fin');
            $table->integer('capacite')->default(0);
            $table->string('cover');
            $table->string('affiche');
            $table->decimal('prix', 10, 2)->default(0.00);
            $table->string('ville');
            $table->string('location'); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('formations');
    }
};
