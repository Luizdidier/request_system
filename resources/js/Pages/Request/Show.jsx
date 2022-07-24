import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import moment from 'moment';
import Button from '@/Components/Button';
import { Inertia } from '@inertiajs/inertia';
import CurrencyFormat from 'react-currency-format';

function Show({ auth, errors, request }) {
  const mountTotal = (preco, quantity) => {
    return Number(preco.replace(',', '.')) * Number(quantity);
  };

  const requestTotal = request.products.reduce(
    (previousValue, currentValue) => {
      return (
        previousValue +
        Number(currentValue.preco) * Number(currentValue.pivot.quantity)
      );
    },
    0
  );

  const handleBack = () => {
    Inertia.visit(`/request`);
  };

  return (
    <Authenticated
      auth={auth}
      errors={errors}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Detalhes do Pedido
        </h2>
      }
    >
      <Head title="Detalhes do Pedido" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <div>
                <div className="flex items-center justify-center ">
                  <div className="w-full bg-white shadow-lg">
                    <div className="flex justify-between p-4">
                      <div>
                        <h1 className="text-3xl italic w-3/5 font-extrabold tracking-widest text-slate-500">
                          Pedido
                        </h1>
                      </div>
                      <div className="p-2"></div>
                    </div>
                    <div className="w-full h-0.5 bg-slate-500" />
                    <div className="flex justify-between p-4">
                      <div>
                        <h6 className="font-bold">
                          Data do pedido
                          <span className="text-sm font-medium">
                            {' '}
                            {moment(request.created_at.split('T')[0]).format(
                              'DD/MM/YYYY'
                            )}
                          </span>
                        </h6>
                      </div>
                      <div className="w-80">
                        <address className="text-sm">
                          <span className="font-bold"> Cliente : </span>
                          {request.client.nome}
                          <br />
                          <span className="font-bold"> Telefone : </span>
                          {request.client.telefone}
                        </address>
                      </div>

                      <div />
                    </div>
                    <div className="flex justify-center p-4">
                      <div className="border-b border-gray-200 shadow w-full">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-2 text-xs text-gray-500 ">
                                #
                              </th>
                              <th className="px-4 py-2 text-xs text-gray-500 ">
                                Nome do Produto
                              </th>
                              <th className="px-4 py-2 text-xs text-gray-500 ">
                                Quantidade
                              </th>
                              <th className="px-4 py-2 text-xs text-gray-500 ">
                                Preco
                              </th>
                              <th className="px-4 py-2 text-xs text-gray-500 ">
                                Total
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            {request.products.map((el) => (
                              <tr className="whitespace-nowrap text-center">
                                <td className="px-6 py-4 text-sm text-gray-500">
                                  1
                                </td>
                                <td className="px-6 py-4">
                                  <div className="text-sm text-gray-900">
                                    {el.descricao}
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="text-sm text-gray-500">
                                    {el.pivot.quantity}
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                  <CurrencyFormat
                                    value={el.preco}
                                    decimalSeparator=","
                                    displayType={'text'}
                                    thousandSeparator={'.'}
                                    prefix={'R$'}
                                    renderText={(value) => <div>{value}</div>}
                                  />
                                </td>
                                <td className="px-6 py-4">
                                  <CurrencyFormat
                                    value={mountTotal(
                                      el.preco,
                                      el.pivot.quantity
                                    )}
                                    decimalSeparator=","
                                    displayType={'text'}
                                    thousandSeparator={'.'}
                                    prefix={'R$'}
                                    renderText={(value) => <div>{value}</div>}
                                  />
                                </td>
                              </tr>
                            ))}

                            <tr className="text-white bg-gray-800 text-center">
                              <th colSpan={3} />
                              <td className="text-sm font-bold">
                                <b>Total</b>
                              </td>
                              <td className="text-sm font-bold">
                                <CurrencyFormat
                                  value={requestTotal}
                                  decimalSeparator=","
                                  displayType={'text'}
                                  thousandSeparator={'.'}
                                  prefix={'R$'}
                                  renderText={(value) => <b>{value}</b>}
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="w-full h-0.5 bg-slate-500" />
                    <div className="p-4">
                      <div className="flex items-center justify-center">
                        Muito obrigado por fazer negócios conosco.
                      </div>
                      <div className="flex items-end justify-end space-x-3">
                        <Button
                          className="px-4 py-2 text-sm text-statle-600 bg-statle-100"
                          onClick={handleBack}
                        >
                          Voltar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Authenticated>
  );
}

export default Show;
