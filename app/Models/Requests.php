<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Requests extends Model
{
    use HasFactory;

    protected $table = 'request';

    protected $fillable = [
        'client_id',
        'paymentType_id',
    ];

    public function products(){
        return $this->belongsToMany(Product::class, 'request_products')->withPivot(['quantity', 'unit_value']);
    }

    public function client(){
        return $this->belongsTo(Client::class);
    }

    public function paymentType(){
        return $this->belongsTo(PaymentType::class, 'paymentType_id');
    }


}
