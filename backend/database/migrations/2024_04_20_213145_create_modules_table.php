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
        Schema::create('modules', function (Blueprint $table) {
            $table->id();
            $table->string('titre_fr');
            $table->string('titre_ar');
            $table->integer('duree');
            $table->foreignId('formateur_id')->nullable()->constrained('formateurs')->onDelete('set null');
            $table->foreignId('formation_id')->nullable()->constrained('formations')->onDelete('cascade'); 
            $table->decimal('prix', 10, 2)->default(0.00);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('modules');
    }
};
