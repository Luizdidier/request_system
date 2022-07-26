<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Client;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $clients = Client::get();
        return Inertia::render('Client/Index', ['clients' => $clients]);
    }

    /**
     * Display the registration view.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        //
        return Inertia::render('Client/Create');
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
            'nome' => 'required|string|max:255',
            'cpf/cnpj' => 'required|cpf_ou_cnpj|max:255|unique:client',
            'telefone' => 'required|string|max:255',
            'dataNasc' =>  'date_format:Y-m-d' 
        ], [
            'nome.required' => 'Campo de Nome é obrigatório',
            'cpf/cnpj.required' => 'Campo de CPF ou CNPJ é obrigatório',
            'cpf/cnpj.cpf_ou_cnpj' => 'CPF ou CNPJ inválido',
            'cpf/cnpj.unique' => 'CPF ou CNPJ já esta cadastrado',
            'telefone.required' => 'Campo de Telefone é obrigatório',
            'dataNasc.required' => 'Campo de Data de nascimento é obrigatório',
            'dataNasc.date_format' => 'Campo de Data de nascimento é obrigatório',
        ]);

        Client::create([
            'nome' => $request->nome,
            'cpf/cnpj' => $request['cpf/cnpj'],
            'telefone' => $request->telefone,
            'dataNasc' => $request->dataNasc,
        ]);

        return redirect('/client');
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
        $client = Client::where('id', '=', $id)->get()->first();
        return Inertia::render('Client/Create', ['client' => $client]);
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
            'nome' => 'required|string|max:255',
            'cpf/cnpj' => 'required|cpf_ou_cnpj|max:255|unique:client',
            'telefone' => 'required|string|max:255',
            'dataNasc' =>  'date_format:Y-m-d' 
        ], [
            'nome.required' => 'Campo de Nome é obrigatório',
            'cpf/cnpj.required' => 'Campo de CPF ou CNPJ é obrigatório',
            'cpf/cnpj.cpf_ou_cnpj' => 'CPF ou CNPJ inválido',
            'cpf/cnpj.unique' => 'CPF ou CNPJ já esta cadastrado',
            'telefone.required' => 'Campo de Telefone é obrigatório',
            'dataNasc.required' => 'Campo de Data de nascimento é obrigatório',
            'dataNasc.date_format' => 'Campo de Data de nascimento é obrigatório',
        ]);

        $client = Client::find($id);
        $client->nome = $request->nome;
        $client['cpf/cnpj'] = $request['cpf/cnpj'];
        $client->telefone = $request->telefone;
        $client->dataNasc = $request->dataNasc;
        $client->save();
        return redirect('/client');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Client::find($id)->delete();
        return redirect('/client');
    }
}
