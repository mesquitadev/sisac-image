import React, { useState } from "react"
import { Layout, Menu, Button, Space } from "antd"

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TableOutlined,
} from "@ant-design/icons"

import { Link } from "react-router-dom"
import { LogoContainer, Logo } from "./styles"

import logo from "../../assets/logo.png"

export default function index({ children }) {
  const { Header, Sider, Content, Footer } = Layout
  const [collapsed, setCollapsed] = useState(false)

  const toggleMenu = () => setCollapsed((state) => !state)

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width="300"
        style={{
          overflow: "auto",
          left: 0,
        }}
      >
        <LogoContainer>
          <Logo src={logo} />
        </LogoContainer>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <Link to="/atendimentos">
              <TableOutlined />
              <span>Atendimentos</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <Space className="toggle">
            <Button
              onClick={toggleMenu}
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            />
          </Space>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 10,
            minHeight: "auto",
          }}
        >
          <div>{children}</div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Sisac Image ©2021 Desenvolvido por Sisac Brasil
        </Footer>
      </Layout>
    </Layout>
  )
}
