<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Requests;
use App\Models\Client;
use App\Models\Product;
use App\Models\PaymentType;
use Inertia\Inertia;

class RequestController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $requests = Requests::with(['products', 'client', 'paymentType'])->get();
        return Inertia::render('Request/Index', ['requests' => $requests]);
    }

    /**
     * Display the registration view.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        //
        $clients = Client::get();
        $products = Product::get();
        $paymentTypes = PaymentType::get();
        return Inertia::render('Request/Create', ['clients' => $clients, 'products' => $products, 'paymentTypes' => $paymentTypes]);
    }

  /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        //
        try {
            $request->validate([
                'client_id' => 'required|string|max:255',
                'paymentType_id' => 'required|string|max:255',
            ]);
    
            DB::beginTransaction();

            $req = Requests::create([
                'client_id' => $request->client_id,
                'paymentType_id' => $request->paymentType_id,
            ]);
    
            foreach ($request->products as $productValue) {
    
                $productId = $productValue['productId'];
                $quantity = $productValue['quantity'];
    
                $req->products()
                    ->attach($productId, ['quantity' => $quantity]);
            }
    
            $req->save();

            DB::commit();
    
            return redirect('/request');
        } catch (Exception $e) {
            DB::rollBack();
        }
      
    }

    // /**
    //  * Display the specified resource.
    //  *
    //  * @param  int  $id
    //  * @return \Illuminate\Http\Response
    //  */
    // public function show($id)
    // {
    //     //
    //     $product = Product::where('id', '=', $id)->get()->first();
    //     return Inertia::render('Product/Create', ['product' => $product]);
    // }

    // /**
    //  * Update the specified resource in storage.
    //  *
    //  * @param  \Illuminate\Http\Request  $request
    //  * @param  int  $id
    //  * @return \Illuminate\Http\Response
    //  */
    // public function update(Request $request, $id)
    // {
    //     //
    //     $request->validate([
    //         'descricao' => 'required|string|max:255',
    //         'unidadeMedida' => 'required|string|max:255',
    //         'preco' => 'required|string|max:255',
    //     ]);

    //     $product = Product::find($id);
    //     $product->descricao = $request->descricao;
    //     $product->unidadeMedida = $request->unidadeMedida;
    //     $product->preco = $request->preco;
    //     $product->save();
    //     return redirect('/product');
    // }

    // /**
    //  * Remove the specified resource from storage.
    //  *
    //  * @param  int  $id
    //  * @return \Illuminate\Http\Response
    //  */
    // public function destroy($id)
    // {
    //     Product::find($id)->delete();
    //     return redirect('/product');
    // }
}
