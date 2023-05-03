import React, { useState, useEffect } from "react";
import "./style.css";

export function Dashboard() {
  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    async function fetchDashboardData() {
      const response = await fetch("http://localhost:3001/dashboard");
      const data = await response.json();
      setDashboardData(data);
    }
    fetchDashboardData();
  }, []);

  return (
    <>

            <div className="row mt-4">
              <div className="col-xl-3 col-sm-6 col-12 mb-4">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between px-md-1">
                      <div>
                        <h3 className="text-warning">{dashboardData.totalClientes || 0}</h3>
                        <p className="mb-0">Clientes cadastrados</p>
                      </div>
                      <div className="align-self-center">
                      <i className="bi bi-people-fill text-warning fa-3x"></i>
                      </div>
                    </div>
                    <div className="px-md-1">
                      <div className="progress mt-3 mb-1 rounded" style={{height:`7px`}}>
                        <div
                             className="progress-bar bg-warning"
                             role="progressbar"
                             style={{width: `100%`}}
                             aria-valuenow="80"
                             aria-valuemin="0"
                             aria-valuemax="100"
                             ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 col-12 mb-4">
              <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between px-md-1">
                      <div>
                        <h3 className="text-warning">{dashboardData.totalPets || 0}</h3>
                        <p className="mb-0">Pets cadastrados</p>
                      </div>
                      <div className="align-self-center">
                      <i className="bi bi-star-fill text-warning fa-3x"></i>
                      </div>
                    </div>
                    <div className="px-md-1">
                      <div className="progress mt-3 mb-1 rounded" style={{height:`7px`}}>
                        <div
                             className="progress-bar bg-warning"
                             role="progressbar"
                             style={{width: `100%`}}
                             aria-valuenow="80"
                             aria-valuemin="0"
                             aria-valuemax="100"
                             ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 col-12 mb-4">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between px-md-1">
                      <div>
                        <h3 className="text-warning">{dashboardData.totalProdutos|| 0}</h3>
                        <p className="mb-0">Produtos cadastrados</p>
                      </div>
                      <div className="align-self-center">
                        <i className="bi bi-box-fill text-warning fa-3x"></i>
                      </div>
                    </div>
                    <div className="px-md-1">
                      <div className="progress mt-3 mb-1 rounded" style={{height: `7px`}}>
                        <div
                             className="progress-bar bg-warning"
                             role="progressbar"
                             style={{width: `100%`}}
                             aria-valuenow="60"
                             aria-valuemin="0"
                             aria-valuemax="100"
                             ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 col-12 mb-4">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between px-md-1">
                      <div>
                        <h3 className="text-warning">{dashboardData.totalServicos || 0}</h3>
                        <p className="mb-0">Serviços cadastrados</p>
                      </div>
                      <div className="align-self-center">
                      <i className="bi bi-basket3-fill text-warning fa-3x"></i>
                      </div>
                    </div>
                    <div className="px-md-1">
                      <div className="progress mt-3 mb-1 rounded" style={{height: `7px`}}>
                        <div
                             className="progress-bar bg-warning"
                             role="progressbar"
                             style={{width: `810%`}}
                             aria-valuenow="40"
                             aria-valuemin="0"
                             aria-valuemax="100"
                             ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 col-12 mb-4">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between px-md-1">
                      <div>
                        <h3 className="text-warning">{dashboardData.totalAgendamentos || 0}</h3>
                        <p className="mb-0">Agendamentos cadastrados
</p>
                      </div>
                      <div className="align-self-center">
                      <i className="bi bi-calendar-event-fill text-warning fa-3x"></i>
                      </div>
                    </div>
                    <div className="px-md-1">
                      <div className="progress mt-3 mb-1 rounded" style={{height: `7px`}}>
                        <div
                             className="progress-bar bg-warning"
                             role="progressbar"
                             style={{width: `100%`}}
                             aria-valuenow="40"
                             aria-valuemin="0"
                             aria-valuemax="100"
                             ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

    </>
  );
}
