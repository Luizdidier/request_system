<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $products = Product::get();
        return Inertia::render('Product/Index', ['products' => $products]);
    }

    /**
     * Display the registration view.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        //
        return Inertia::render('Product/Create');
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
        $request->validate([
            'descricao' => 'required|string|max:255',
            'unidadeMedida' => 'required|string|max:255',
            'preco' => 'required|string|max:255',
        ]);

        Product::create([
            'descricao' => $request->descricao,
            'unidadeMedida' => $request->unidadeMedida,
            'preco' => $request->preco,
        ]);

        return redirect('/product');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $product = Product::where('id', '=', $id)->get()->first();
        return Inertia::render('Product/Create', ['product' => $product]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $request->validate([
            'descricao' => 'required|string|max:255',
            'unidadeMedida' => 'required|string|max:255',
            'preco' => 'required|string|max:255',
        ]);

        $product = Product::find($id);
        $product->descricao = $request->descricao;
        $product->unidadeMedida = $request->unidadeMedida;
        $product->preco = $request->preco;
        $product->save();
        return redirect('/product');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Product::find($id)->delete();
        return redirect('/product');
    }
}
