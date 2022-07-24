import React, { useEffect, useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, useForm } from '@inertiajs/inertia-react';
import Button from '@/Components/Button';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import CurrencyInput from 'react-currency-input-field';
import InputMask from 'react-input-mask';
import Input from '@/Components/Input';
import DataTable from 'react-data-table-component';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import CurrencyFormat from 'react-currency-format';

export default function Create({
  auth,
  clients,
  products,
  paymentTypes,
  errors,
}) {
  const { data, setData, post, put, processing } = useForm({
    client_id: '',
    total: '',
  });
  const [listProducts, setListProducts] = useState([]);

  const handleDelete = (id) => {
    const filter = listProducts.filter((el) => el.productId !== id);
    setListProducts(filter);
  };

  const columns = [
    {
      name: 'Nome do Produto',
      selector: (row) => row.productName,
    },
    {
      name: 'Quantidade',
      selector: (row) => row.quantity,
    },
    {
      name: 'Valor Total',
      selector: (row) => (
        <CurrencyFormat
          value={row.total}
          decimalSeparator=","
          displayType={'text'}
          thousandSeparator={'.'}
          prefix={'R$'}
          renderText={(value) => <div>{value}</div>}
        />
      ),
    },
    {
      name: '',
      selector: (row) => (
        <>
          <button
            type="button"
            className="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
            onClick={() => handleDelete(row.productId)}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 457.503 457.503"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M381.575,57.067h-90.231C288.404,25.111,261.461,0,228.752,0C196.043,0,169.1,25.111,166.16,57.067H75.929
           c-26.667,0-48.362,21.695-48.362,48.362c0,26.018,20.655,47.292,46.427,48.313v246.694c0,31.467,25.6,57.067,57.067,57.067
           h195.381c31.467,0,57.067-25.6,57.067-57.067V153.741c25.772-1.02,46.427-22.294,46.427-48.313
           C429.936,78.761,408.242,57.067,381.575,57.067z M165.841,376.817c0,8.013-6.496,14.509-14.508,14.509
           c-8.013,0-14.508-6.496-14.508-14.509V186.113c0-8.013,6.496-14.508,14.508-14.508c8.013,0,14.508,6.496,14.508,14.508V376.817z
            M243.26,376.817c0,8.013-6.496,14.509-14.508,14.509c-8.013,0-14.508-6.496-14.508-14.509V186.113
           c0-8.013,6.496-14.508,14.508-14.508c8.013,0,14.508,6.496,14.508,14.508V376.817z M320.679,376.817
           c0,8.013-6.496,14.509-14.508,14.509c-8.013,0-14.509-6.496-14.509-14.509V186.113c0-8.013,6.496-14.508,14.509-14.508
           s14.508,6.496,14.508,14.508V376.817z"
              />
            </svg>
            <span className="sr-only">Delete</span>
          </button>
        </>
      ),
    },
  ];

  const onHandleChange = (event) => {
    setData(
      event.target.name,
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value
    );
  };

  const mountSwal = (msg) =>
    Swal.fire({
      icon: 'success',
      title: msg,
      showConfirmButton: false,
      timer: 1500,
    });

  const submit = async (e) => {
    e.preventDefault();

    let message = '';

    if (!data.id) {
      message = 'Pedido cadastrada com sucesso';
      post(route('request.register'), {
        onSuccess: () => {
          mountSwal(message);
        },
      });
    } else {
      message = 'Pedido atualizada com sucesso';
      put(
        route('request.update', {
          onSuccess: () => {
            mountSwal(message);
          },
        })
      );
    }
  };

  useEffect(() => {
    if (data?.product_id && data?.product_id !== '') {
      const findProduct = products.find(
        (el) => el.id === Number(data.product_id)
      );
      setData({
        ...data,
        preco: findProduct.preco,
        quantity: '',
      });
    } else {
      setData({
        ...data,
        preco: '',
        quantity: '',
      });
    }
  }, [data.product_id]);

  useEffect(() => {
    if (
      data?.product_id &&
      data?.product_id !== '' &&
      data?.quantity.length > 0
    ) {
      setData('total', Number(data.preco.replace(',', '.')) * data.quantity);
    } else {
      setData('total', '');
    }
  }, [data.quantity]);

  const handleAddProduct = () => {
    const findProduct = products.find(
      (el) => el.id === Number(data.product_id)
    );

    const haveProduct = listProducts.find(
      (el) => el?.productId == findProduct.id
    );

    if (!haveProduct?.productId) {
      const mountProduct = [
        {
          productId: findProduct.id,
          productName: findProduct.descricao,
          quantity: data.quantity,
          total: data.total,
        },
      ];

      setListProducts([...listProducts, ...mountProduct]);
      setData({
        ...data,
        preco: '',
        quantity: '',
        product_id: '',
        total: '',
        products: [...listProducts, ...mountProduct],
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Produto já esta cadastrado',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <Authenticated
      auth={auth}
      errors={errors}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Cadastrar Novo Pedido
        </h2>
      }
    >
      <Head title="Novo Pedido" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <ValidationErrors errors={errors} />

            <form onSubmit={submit}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-7 gap-6">
                    <div className="col-span-12 md:col-span-4 xl:col-span-5 lg:col-span-4 sm:col-span-12">
                      <Label forInput="client" value="Cliente" />

                      <select
                        id="client"
                        name="client_id"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={onHandleChange}
                        value={data.client_id}
                      >
                        <option value="">Selecione ...</option>
                        {clients?.map((el) => (
                          <option value={el.id} key={el.id}>
                            {el.nome}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-12 md:col-span-3 xl:col-span-2 lg:col-span-3 sm:col-span-12">
                      <Label
                        forInput="paymentType"
                        value="Forma de Pagamento"
                      />

                      <select
                        id="paymentType"
                        name="paymentType_id"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={onHandleChange}
                        value={data.paymentType_id}
                      >
                        <option value="">Selecione ...</option>
                        {paymentTypes?.map((el) => (
                          <option value={el.id} key={el.id}>
                            {el.descricao}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-12 xl:col-span-2 lg:col-span-2 md:col-span-6 sm:col-span-12">
                      <Label forInput="product" value="Produto" />

                      <select
                        id="product"
                        name="product_id"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={onHandleChange}
                        value={data.product_id}
                      >
                        <option value="">Selecione ...</option>
                        {products?.map((el) => (
                          <option value={el.id} key={el.id}>
                            {el.descricao}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-12 xl:col-span-1 lg:col-span-1 md:col-span-2 sm:col-span-12">
                      <Label forInput="preco" value="Preço" />
                      <CurrencyInput
                        id="preco"
                        name="preco"
                        disabled
                        value={data.preco}
                        decimalsLimit={2}
                        intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                        className="w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onValueChange={(value, name) => setData(name, value)}
                      />
                    </div>

                    <div className="col-span-12 xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-12">
                      <Label forInput="quantity" value="Quantidade" />
                      <InputMask mask="999" maskChar="" value={data.quantity}>
                        {() => (
                          <Input
                            type="text"
                            name="quantity"
                            className="block w-full"
                            isFocused={true}
                            handleChange={onHandleChange}
                          />
                        )}
                      </InputMask>
                    </div>

                    <div className="col-span-12 xl:col-span-2 lg:col-span-2 md:col-span-2 sm:col-span-12">
                      <Label forInput="total" value="Valor Total" />
                      <CurrencyInput
                        id="total"
                        name="total"
                        disabled
                        value={data.total || 0}
                        decimalsLimit={2}
                        intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                        className="w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onValueChange={(value, name) => setData(name, value)}
                      />
                    </div>

                    <div className="col-span-12 xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-12 lg:mt-6 md:mt-6 sm:mt-6 ml-0">
                      <Button
                        className="xl:ml-4 lg:ml-4 md:ml-4 sm:ml-0"
                        processing={processing}
                        onClick={handleAddProduct}
                        type="button"
                      >
                        Adicionar
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <Button
                    type="submit"
                    className="ml-4"
                    processing={processing}
                  >
                    Salvar
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="flex justify-between p-4">
                  <div>
                    <h1 className="text-2xl w-3/5 font-extrabold tracking-widest text-black">
                      Carrinho
                    </h1>
                  </div>
                  <div className="p-2"></div>
                </div>
                <div className="col-span-12 sm:col-span-12">
                  <DataTable
                    columns={columns}
                    data={listProducts}
                    noDataComponent="Carrinho Vazio"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Authenticated>
  );
}
