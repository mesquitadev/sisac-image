import React, { useCallback, useEffect, useState, useRef } from "react"
import {
  Row,
  Col,
  PageHeader,
  Card,
  Button,
  Input,
  Space,
  Select,
  Empty,
  Form,
  Dropdown,
  Menu,
  Descriptions,
  Skeleton,
  message,
} from "antd"
import { useHistory, useLocation } from "react-router-dom"
import { FileTextOutlined } from "@ant-design/icons"
import { Editor } from "@tinymce/tinymce-react"
import { ImagePicker } from "../../components"

const { TextArea } = Input

const { Option } = Select

const Laudo = () => {
  const navigation = useHistory()
  const location = useLocation()
  const editorRef = useRef(null)
  const [component, setComponent] = useState([])
  const [laudoImages, setLaudoImages] = useState([])
  const [selectedImages, setSelectedImages] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)
  const [topics, setTopics] = useState([
    {
      name: "Orofaringe",
      content:
        "1. língua -  Sem Alterações \n 2. Orofaringe - Sem Alterações \n 3. Amígdalas - Sem Alteração \n",
    },
  ])

  useEffect(() => {
    setLaudoImages(location.state.images)
  }, [location])

  useEffect(() => {
    if (editorRef.current) {
      console.log("editor content", editorRef.current.getContent())
    }
  }, [])

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent())
    }
  }

  function handleSelectedImages(imgs) {
    setSelectedImages(imgs)
  }

  const handleInsertText = (e) => {
    const imageSrc = editorRef.current.getContent()
    setText((img) => [...img, imageSrc])
  }

  function handleSelectDevice() {
    setText((ctx) => [
      ...ctx,
      "1. língua -  Sem Alterações \n 2. Orofaringe - Sem Alterações \n 3. Amígdalas - Sem Alteração \n",
    ])
  }

  const onClick = ({ key }) => {
    switch (key) {
      case 1:
        setText((laudo) => [
          ...laudo,
          "1. língua -  Sem Alterações \n 2. Orofaringe - Sem Alterações \n 3. Amígdalas - Sem Alteração \n",
        ])
        break
      case 2:
        setText((laudo) => [
          ...laudo,
          "" +
            "<ul> " +
            "<li> 1. língua -  Sem Alteraçõe</li>" +
            "<li> 2. Orofaringe - Sem Alterações</li>" +
            "<li> 3. Amígdalas - Sem Alteração</li>" +
            "</ul>",
        ])
        break
      default:
        setText((laudo) => [...laudo, "1. Teste\n 2. Teste \n 3. Teste"])
        break
    }
  }

  return (
    <Row>
      <Col span={24}>
        <PageHeader onBack={() => window.history.back()} title="Emitir Laudo" />
      </Col>

      <Row span={24}>
        <Descriptions column={1} title="Paciente">
          {loading ? (
            <Skeleton paragraph={{ rows: 2 }} />
          ) : (
            <>
              <Descriptions.Item label="Nome">Paulo Victor</Descriptions.Item>
              <Descriptions.Item label="Data de Nascimento">
                10/05/1997
              </Descriptions.Item>
              <Descriptions.Item label="Telefone">
                (98)9 9174-1075
              </Descriptions.Item>
              <Descriptions.Item label="Examinador">
                Dr. Áureo Cangussu
              </Descriptions.Item>
              <Descriptions.Item label="Convênio">Bradesco</Descriptions.Item>
            </>
          )}
        </Descriptions>
      </Row>

      <Row gutter={[24]}>
        <Col span={16}>
          <Card
            title="Tópicos"
            extra={topics.map((topic, i) => (
              <Select
                onChange={handleSelectDevice}
                placeholder="Selecione um Dispositivo"
                style={{ width: 120 }}
                mode="tags"
                tokenSeparators={[","]}
              >
                <Option value={topic.content}>{topic.name}</Option>
              </Select>
            ))}
          >
            <Editor
              /* eslint-disable-next-line no-return-assign */
              onInit={(evt, editor) => (editorRef.current = editor)}
              value={text}
              init={{
                height: 500,
                resize: false,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image",
                  "charmap print preview anchor help",
                  "searchreplace visualblocks code",
                  "insertdatetime media table paste wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | print | image  ",
                image_list: location.state.images.map((img, index) => ({
                  title: `Imagem ${index}`,
                  value: img.src,
                })),
              }}
              onChange={handleInsertText}
            />
          </Card>
          <Col span={24}>
            <Button>Salvar</Button>
          </Col>
        </Col>

        <Col span={8}>
          <Card
            title="Imagens"
            bodyStyle={{ overflowY: "scroll", maxHeight: "500px" }}
          >
            {laudoImages.length >= 1 ? (
              <ImagePicker
                inline
                images={laudoImages.map((image, i) => ({
                  src: image.src,
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

export default Laudo
