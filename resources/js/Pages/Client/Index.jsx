import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import Button from '@/Components/Button';
import DataTable from 'react-data-table-component';
import { Inertia } from '@inertiajs/inertia';
import moment from 'moment';

import Swal from 'sweetalert2/dist/sweetalert2.js';

export default function Index({ clients, auth, errors }) {
  const handleEdit = (id) => {
    Inertia.visit(`client/${id}`);
  };

  const handleDelete = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Tem certeza que deseja deletar ?',
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: `Não`,
    });

    if (isConfirmed) {
      Inertia.delete(route('client.destroy', id));
    }
  };

  const columns = [
    {
      name: 'Nome',
      selector: (row) => row.nome,
    },
    {
      name: 'Documento',
      selector: (row) => row['cpf/cnpj'],
    },
    {
      name: 'Data de Nascimento',
      selector: (row) =>
        moment(row.dataNasc.split('T')[0]).format('DD/MM/YYYY'),
    },
    {
      name: 'Telefone',
      selector: (row) => row.telefone,
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
              <path d="M5.243,44.844L42.378,7.708l9.899,9.899L15.141,54.742L5.243,44.844z" />
              <path
                d="M56.521,13.364l1.414-1.414c1.322-1.322,2.05-3.079,2.05-4.949s-0.728-3.627-2.05-4.949S54.855,0,52.985,0
		s-3.627,0.729-4.95,2.051l-1.414,1.414L56.521,13.364z"
              />
              <path
                d="M4.099,46.527L0.051,58.669c-0.12,0.359-0.026,0.756,0.242,1.023c0.19,0.19,0.446,0.293,0.707,0.293
		c0.106,0,0.212-0.017,0.316-0.052l12.141-4.047L4.099,46.527z"
              />
              <path d="M43.793,6.294l1.415-1.415l9.899,9.899l-1.415,1.415L43.793,6.294z" />
            </svg>
            <span className="sr-only">Edit</span>
          </button>
          <button
            type="button"
            className="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
            onClick={() => handleDelete(row.id)}
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

  const handleButton = () => {
    Inertia.visit('client/register');
  };

  return (
    <Authenticated
      auth={auth}
      errors={errors}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Clientes
        </h2>
      }
    >
      <Head title="Clientes" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="px-4 py-3 bg-gray-50 text-left sm:px-6">
              <Button onClick={handleButton}>Novo Cliente</Button>
            </div>
            <div className="p-6 bg-white border-b border-gray-200">
              <DataTable columns={columns} data={clients} pagination />
            </div>
          </div>
        </div>
      </div>
    </Authenticated>
  );
}
