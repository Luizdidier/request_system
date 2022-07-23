<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'product';

    protected $fillable = [
        'descricao',
        'unidadeMedida',
        'preco',
    ];

    public function request(){
        return $this->belongsTo(Requests::class, 'request_products');
    }
}
