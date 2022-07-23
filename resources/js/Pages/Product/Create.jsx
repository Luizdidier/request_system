import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, useForm } from '@inertiajs/inertia-react';
import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import CurrencyInput from 'react-currency-input-field';

import Swal from 'sweetalert2/dist/sweetalert2.js';

export default function Create({ auth, product = null }) {
  const { data, setData, post, put, processing, errors, reset } = useForm({
    id: product?.id || null,
    descricao: product?.descricao || '',
    unidadeMedida: product?.unidadeMedida || '',
    preco: product?.preco || '',
  });

  const onHandleChange = (event) => {
    setData(
      event.target.name,
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value
    );
  };

  const submit = (e) => {
    e.preventDefault();

    let message = '';

    if (!data.id) {
      message = 'Produto cadastrado com sucesso';
      post(route('product.register'));
    } else {
      message = 'Produto atualizado com sucesso';
      put(route('product.update', data.id));
    }

    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <Authenticated
      auth={auth}
      errors={errors}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Cadastrar Produto
        </h2>
      }
    >
      <Head title="Novo Produto" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <ValidationErrors errors={errors} />

            <form onSubmit={submit}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <Label forInput="descricao" value="Descrição" />

                      <Input
                        type="text"
                        name="descricao"
                        value={data.descricao}
                        className="mt-1 block w-full"
                        isFocused={true}
                        handleChange={onHandleChange}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <Label
                        forInput="unidadeMedida"
                        value="Unidade de Medida"
                      />

                      <Input
                        type="text"
                        name="unidadeMedida"
                        value={data.unidadeMedida}
                        className="mt-1 block w-full"
                        isFocused={true}
                        handleChange={onHandleChange}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <Label forInput="preco" value="Preço" />
                      <CurrencyInput
                        id="preco"
                        name="preco"
                        defaultValue={data.preco}
                        decimalsLimit={2}
                        intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                        className="w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onValueChange={(value, name) => setData(name, value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <Button className="ml-4" processing={processing}>
                    Salvar
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Authenticated>
  );
}
