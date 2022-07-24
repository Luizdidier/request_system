<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Requests;
use App\Models\Client;
use App\Models\Product;
use App\Models\PaymentType;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Response;

class RequestController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        $client = $request->query('client');
        $paymentType_id = $request->query('paymentType_id');
        
        if (empty($client) && empty($paymentType_id)) {
            $paymentTypes = PaymentType::get();
            $requests = Requests::with(['products', 'client', 'paymentType'])->get();
            return Inertia::render('Request/Index', ['requests' => $requests, 'paymentTypes' => $paymentTypes]);
        } else {
            $paymentTypes = PaymentType::get();
            $requests = Requests::with(['products', 'client', 'paymentType']);

            if (!empty($client)) {
                $requests = $requests->whereRelation('client', 'nome', 'like', '%'.$client.'%');
            }

            if (!empty($paymentType_id)) {
                $requests = $requests->whereRelation('paymentType', 'id', $paymentType_id);
            }


            $requests = $requests->get();
            return Inertia::render('Request/Index', ['requests' => $requests, 'paymentTypes' => $paymentTypes]);
        }
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
                'products' => 'required|array|min:1'
            ], [
                'client_id.required' => "Campo de Cliente é obrigatório.",
                'paymentType_id.required' => "Campo de Forma de pagamento é obrigatório.",
                'products.required' => "É obrigatório ter pelo menos um Produto cadastrado no pedido."
            ]);
    
            DB::beginTransaction();

            $req = Requests::create([
                'client_id' => $request->client_id,
                'paymentType_id' => $request->paymentType_id,
            ]);
    
            foreach ($request->products as $productValue) {
    
                $productId = $productValue['productId'];
                $quantity = $productValue['quantity'];
                $preco = $productValue['preco'];
    
                $req->products()
                    ->attach($productId, ['quantity' => $quantity, 'unit_value' => $preco, ]);
            }
    
            $req->save();

            DB::commit();
    
            return redirect('/request');
        } catch (Exception $e) {
            DB::rollBack();
        }
      
    }

    /**
     * Display the specified resource.
     *
     * @param  int 
     * @return \Inertia\Response
     */

    public function show($id)
    {
        //
        $request = Requests::with(['products', 'client', 'paymentType'])
                  ->where('id', '=', $id)->get()->first();
        return Inertia::render('Request/Show', ['request' => $request]);
    }

    /**
     * Display the specified resource.
     *
     * @return \Inertia\Response
     */
    public function requestsToday()
    {   
        $requests = Requests::whereDate('created_at', '2022-07-24')->get();
        $count = count($requests);
        return response()->json(['requestsToday' => $count]);
    }
}
