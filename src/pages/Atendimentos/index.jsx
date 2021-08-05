import React, { useEffect, useState } from "react"
import { Table, Tag, Space, Button, Row, Col, message } from "antd"
import { Link } from "react-router-dom"
import api from "../../services/api"

const Atendimentos = () => {
  const { Column, ColumnGroup } = Table
  const [pacientes, setPacientes] = useState([
    {
      codpaciente: "000400",
      paciente: "Paulo Victor",
    },
  ])
  useEffect(() => {
    api
      .get("entradas")
      .then((response) => setPacientes(response.data))
      .catch((res) => message.error("Error: ", res))
  }, [])

  return (
    <Row span={24}>
      <Col span={24}>
        <Table dataSource={pacientes}>
          <Column
            title="CODPACIENTE"
            dataIndex="codpaciente"
            key="codpaciente"
          />
          <Column title="PACIENTE" dataIndex="paciente" key="paciente" />
          <Column
            title="Ações"
            key="action"
            render={(text, record) => (
              <Space size="middle">
                <Link
                  to={`atendimento/${record.codpaciente}`}
                  params={{ id: record.codpaciente }}
                >
                  <Button>Iniciar Atendimento {record.lastName}</Button>
                </Link>
              </Space>
            )}
          />
        </Table>
      </Col>
    </Row>
  )
}

export default Atendimentos
