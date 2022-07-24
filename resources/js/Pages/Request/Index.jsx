import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, useForm } from '@inertiajs/inertia-react';
import Button from '@/Components/Button';
import Label from '@/Components/Label';
import Input from '@/Components/Input';
import DataTable from 'react-data-table-component';
import { Inertia } from '@inertiajs/inertia';

const paginationComponentOptions = {
  noRowsPerPage: true,
  rowsPerPageText: 'Filas por página',
  rangeSeparatorText: 'de',
};

export default function Index({ requests, auth, errors, paymentTypes }) {
  const { data, setData, get } = useForm({
    client: '',
    paymentType_id: '',
  });
  const handleEdit = (id) => {
    Inertia.visit(`request/${id}`);
  };

  const columns = [
    {
      name: 'Cliente',
      selector: (row) => row.client.nome,
    },
    {
      name: 'Forma de Pagamento',
      selector: (row) => row.payment_type.descricao,
    },
    {
      name: '',
      selector: (row) => (
        <>
          <button
            type="button"
            className="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
            onClick={() => handleEdit(row.id)}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 59.985 59.985"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M51.062,21.561c-5.759-5.759-13.416-8.931-21.561-8.931S13.7,15.801,7.941,21.561L0,29.501l8.138,8.138
		c5.759,5.759,13.416,8.931,21.561,8.931s15.802-3.171,21.561-8.931l7.941-7.941L51.062,21.561z M49.845,36.225
		c-5.381,5.381-12.536,8.345-20.146,8.345s-14.765-2.963-20.146-8.345l-6.724-6.724l6.527-6.527
		c5.381-5.381,12.536-8.345,20.146-8.345s14.765,2.963,20.146,8.345l6.724,6.724L49.845,36.225z"
              />
              <path
                d="M29.572,16.57c-7.168,0-13,5.832-13,13s5.832,13,13,13s13-5.832,13-13S36.741,16.57,29.572,16.57z M29.572,24.57
		c-2.757,0-5,2.243-5,5c0,0.552-0.448,1-1,1s-1-0.448-1-1c0-3.86,3.14-7,7-7c0.552,0,1,0.448,1,1S30.125,24.57,29.572,24.57z"
              />
            </svg>
            <span className="sr-only">Edit</span>
          </button>
        </>
      ),
    },
  ];

  const handleButton = () => {
    Inertia.visit('request/register');
  };

  const onHandleChange = (event) => {
    setData(
      event.target.name,
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    get(route('request.index'));
  };

  return (
    <Authenticated
      auth={auth}
      errors={errors}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Pedidos
        </h2>
      }
    >
      <Head title="Formas de Pagamento" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="px-4 py-3 bg-gray-50 text-left sm:px-6">
              <Button onClick={handleButton}>Nova Pedido</Button>
            </div>
            <div className="p-6 bg-white border-b border-gray-200">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-7 gap-6">
                  <div className="col-span-12 xl:col-span-1 lg:col-span-1 md:col-span-3 sm:col-span-12">
                    <Label forInput="client" value="Nome do Cliente" />
                    <Input
                      type="text"
                      name="client"
                      className="block w-full"
                      isFocused={true}
                      handleChange={onHandleChange}
                    />
                  </div>

                  <div className="col-span-6 md:col-span-3 xl:col-span-5 lg:col-span-4 sm:col-span-6">
                    <Label forInput="paymentType" value="Forma de Pagamento" />

                    <select
                      id="paymentType"
                      name="paymentType_id"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={onHandleChange}
                      value={data.paymentTypes}
                    >
                      <option value="">Selecione ...</option>
                      {paymentTypes?.map((el) => (
                        <option value={el.id} key={el.id}>
                          {el.descricao}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-12 xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-12 lg:mt-6 md:mt-6 sm:mt-6 ml-0">
                    <Button type="submit">Filtrar</Button>
                  </div>
                </div>
              </form>
              <DataTable
                columns={columns}
                data={requests}
                pagination
                noDataComponent="Não há dados disponíveis"
                paginationComponentOptions={paginationComponentOptions}
              />
            </div>
          </div>
        </div>
      </div>
    </Authenticated>
  );
}
