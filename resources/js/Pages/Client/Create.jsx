import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, useForm } from '@inertiajs/inertia-react';
import InputMask from 'react-input-mask';
import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import moment from 'moment';

import Swal from 'sweetalert2/dist/sweetalert2.js';

export default function Create({ auth, client = null }) {
  const { data, setData, post, put, processing, errors, reset } = useForm({
    id: client?.id || null,
    nome: client?.nome || '',
    'cpf/cnpj': client?.['cpf/cnpj'] || '',
    dataNasc: client?.dataNasc
      ? moment(client.dataNasc.split('T')[0]).format('YYYY-MM-DD')
      : '',
    telefone: client?.telefone || '',
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
      message = 'Cliente cadastrado com sucesso';
      post(route('client.register'));
    } else {
      message = 'Cliente atualizado com sucesso';
      put(route('client.update', data.id));
    }

    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const beforeMaskedValueChange = (
    newState,
    oldState,
    userInput,
    nameInput
  ) => {
    var { value } = newState;
    var selection = newState.selection;
    var cursorPosition = selection ? selection.start : null;

    if (
      (value.endsWith('-') &&
        userInput !== '-' &&
        !data[nameInput].endsWith('-')) ||
      (value.endsWith('.') &&
        userInput !== '.' &&
        !data[nameInput].endsWith('.')) ||
      (value.endsWith(')') &&
        userInput !== ')' &&
        !data[nameInput].endsWith(')')) ||
      (value.endsWith('(') &&
        userInput !== '(' &&
        !data[nameInput].endsWith('(')) ||
      (value.endsWith(' ') &&
        userInput !== ' ' &&
        !data[nameInput].endsWith(' '))
    ) {
      if (cursorPosition === value.length) {
        cursorPosition--;
        selection = { start: cursorPosition, end: cursorPosition };
      }
      value = value.slice(0, -1);
    }

    return {
      value,
      selection,
    };
  };

  const auxBeforeMask = (newState, oldState, userInput) => {
    beforeMaskedValueChange(newState, oldState, userInput, nameInput);
  };

  return (
    <Authenticated
      auth={auth}
      errors={errors}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Cadastrar Cliente
        </h2>
      }
    >
      <Head title="Create Request" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <ValidationErrors errors={errors} />

            <form onSubmit={submit}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <Label forInput="nome" value="Nome" />

                      <Input
                        type="text"
                        name="nome"
                        value={data.nome}
                        className="mt-1 block w-full"
                        isFocused={true}
                        handleChange={onHandleChange}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <Label forInput="cpf/cnpj" value="CPF/CNPJ" />
                      <InputMask
                        mask={
                          data['cpf/cnpj'].length <= 14
                            ? '999.999.999-999'
                            : '99.999.999/9999-99'
                        }
                        maskChar=""
                        value={data['cpf/cnpj']}
                        beforeMaskedValueChange={(
                          newState,
                          oldState,
                          userInput
                        ) =>
                          beforeMaskedValueChange(
                            newState,
                            oldState,
                            userInput,
                            'cpf/cnpj'
                          )
                        }
                      >
                        {(inputProps) => (
                          <Input
                            type="text"
                            name="cpf/cnpj"
                            className="mt-1 block w-full"
                            isFocused={true}
                            handleChange={onHandleChange}
                          />
                        )}
                      </InputMask>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <Label forInput="dataNasc" value="Data de Nascimento" />

                      <Input
                        type="date"
                        name="dataNasc"
                        value={data.dataNasc}
                        className="mt-1 block w-full"
                        isFocused={true}
                        handleChange={onHandleChange}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <Label forInput="telefone" value="Telefone" />
                      <InputMask
                        mask="(99) 99999-9999"
                        maskChar=""
                        value={data.telefone}
                        beforeMaskedValueChange={(
                          newState,
                          oldState,
                          userInput
                        ) =>
                          beforeMaskedValueChange(
                            newState,
                            oldState,
                            userInput,
                            'telefone'
                          )
                        }
                      >
                        {(inputProps) => (
                          <Input
                            type="text"
                            name="telefone"
                            className="mt-1 block w-full"
                            isFocused={true}
                            handleChange={onHandleChange}
                          />
                        )}
                      </InputMask>
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
