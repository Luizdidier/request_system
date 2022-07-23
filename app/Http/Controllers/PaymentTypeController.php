<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\PaymentType;

class PaymentTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $paymentTypes = PaymentType::get();
        return Inertia::render('PaymentType/Index', ['paymentTypes' => $paymentTypes]);
    }

    /**
     * Display the registration view.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        //
        return Inertia::render('PaymentType/Create');
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
        ]);

        PaymentType::create([
            'descricao' => $request->descricao,
        ]);

        return redirect('/paymentType');
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
        $paymentType = PaymentType::where('id', '=', $id)->get()->first();
        return Inertia::render('PaymentType/Create', ['paymentType' => $paymentType]);
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
        ]);

        $paymentType = PaymentType::find($id);
        $paymentType->descricao = $request->descricao;
        $paymentType->save();
        return redirect('/paymentType');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        PaymentType::find($id)->delete();
        return redirect('/paymentType');
    }
}
