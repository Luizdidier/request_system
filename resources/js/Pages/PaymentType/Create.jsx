import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, useForm } from '@inertiajs/inertia-react';
import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';

import Swal from 'sweetalert2/dist/sweetalert2.js';

export default function Create({ auth, paymentType = null }) {
  const { data, setData, post, put, processing, errors } = useForm({
    id: paymentType?.id || null,
    descricao: paymentType?.descricao || '',
  });

  const onHandleChange = (event) => {
    setData(
      event.target.name,
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value
    );
  };

  const mountSwal = (msg) => {
    Swal.fire({
      icon: 'success',
      title: msg,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const submit = (e) => {
    e.preventDefault();

    let message = '';

    if (!data.id) {
      message = 'Forma de pagamento cadastrada com sucesso';
      post(route('paymentType.register'), {
        onSuccess: () => {
          mountSwal(message);
        },
      });
    } else {
      message = 'Forma de pagemento atualizada com sucesso';
      put(route('paymentType.update', data.id), {
        onSuccess: () => {
          mountSwal(message);
        },
      });
    }
  };

  return (
    <Authenticated
      auth={auth}
      errors={errors}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Cadastrar Forma de Pagamento
        </h2>
      }
    >
      <Head title="Nova Forma de Pagamento" />

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
