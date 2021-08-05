import React, { useCallback, useEffect, useRef, useState } from "react"
import {
  Button,
  Card,
  Col,
  Descriptions,
  Empty,
  Row,
  Space,
  Tooltip,
  Skeleton,
  message,
  Dropdown,
  Menu,
} from "antd"
import {
  CameraOutlined,
  VideoCameraOutlined,
  FileTextOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons"
import Webcam from "react-webcam"
import { useHistory, useParams } from "react-router-dom"
import { ImagePicker } from "../../components"
import api from "../../services/api"
import "./styles.css"

const Atendimento = () => {
  const history = useHistory()
  const webcamRef = useRef(null)
  const { id } = useParams()
  const [selectedPaciente, setSelectedPaciente] = useState()
  const [loading, setLoading] = useState(false)
  const [audio, setAudio] = useState(false)
  const [images, setImages] = useState([])
  const [selectedImages, setSelectedImages] = useState([])
  const [deviceId, setDeviceId] = React.useState({})
  const [devices, setDevices] = React.useState([])

  useEffect(() => {
    async function getItems() {
      try {
        const { data } = await api.get(`/paciente/${id}`)
        setSelectedPaciente(data)
        setLoading(false)
      } catch (error) {
        message.error("Ocorreu um erro ao buscar os dados do paciente")
      }
    }
    // eslint-disable-next-line no-console
    getItems().then((r) => console.log("error", r))
  }, [])

  const handleDevices = React.useCallback(
    (mediaDevices) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  )

  React.useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices)
  }, [handleDevices])

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot()
    setImages((img) => [...img, imageSrc])
  }, [webcamRef])

  function handleSelectedImages(imgs) {
    setSelectedImages(imgs)
  }

  function handleCreateReport() {
    history.push({
      pathname: "/laudo",
      state: { images: selectedImages },
    })
  }

  const menu = (
    <Menu onClick={() => handleCreateReport()}>
      <Menu.Item key="1">VideoLaparoscopia</Menu.Item>
      <Menu.Item key="2">Endoscopia</Menu.Item>
    </Menu>
  )

  return (
    <Row span={24}>
      <Row span={24}>
        <Descriptions
          title="Dados do Paciente"
          extra={<Button type="primary">Salvar para Capturar Posterior</Button>}
        >
          {loading ? (
            <Skeleton paragraph={{ rows: 2 }} />
          ) : (
            <>
              <Descriptions.Item label="Nome">Paulo Victor</Descriptions.Item>
              <Descriptions.Item label="Data de Nascimento">
                10/05/1997
              </Descriptions.Item>
              <Descriptions.Item label="Telefone">
                (98) 9 9174-1075
              </Descriptions.Item>
            </>
          )}
        </Descriptions>
      </Row>
      <Row gutter={[24]}>
        <Col span={12}>
          <Card
            title={
              <span>
                Captura
                <Tooltip
                  title="Captura de Imagens do Equipamento"
                  placement="right"
                >
                  <InfoCircleOutlined />
                </Tooltip>
              </span>
            }
            bodyStyle={{ padding: 0 }}
          >
            {devices.map((device, key) => (
              <div>
                <Webcam
                  audio={false}
                  videoConstraints={{ deviceId: device.deviceId }}
                />
                {device.label || `Device ${key + 1}`}
              </div>
            ))}
            <Webcam
              audio={audio}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width="100%"
            />
            <Space style={{ padding: 10 }}>
              <Button
                icon={<CameraOutlined />}
                type="primary"
                onClick={() => capture()}
              >
                Capturar Imagem
              </Button>
              <Button
                icon={<VideoCameraOutlined />}
                type="danger"
                onClick={() => capture()}
              >
                Gravar Vídeo
              </Button>
              <Dropdown overlay={menu}>
                <Button icon={<FileTextOutlined />} onClick={() => capture()}>
                  Emitir Laudo
                </Button>
              </Dropdown>
            </Space>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="Imagens Capturadas"
            bodyStyle={{ overflowY: "scroll", maxHeight: "500px" }}
          >
            {images.length >= 1 ? (
              <ImagePicker
                images={images.map((image, i) => ({
                  src: image,
                  value: i,
                }))}
                multiple
                onPick={(selImgs) => handleSelectedImages(selImgs)}
              />
            ) : (
              <Empty />
            )}
          </Card>
        </Col>
      </Row>
    </Row>
  )
}

export default Atendimento
