import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserAddOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { useMediaQuery } from 'react-responsive';
import {
  Breadcrumb,
  Layout,
  Menu,
  Table,
  Typography,
  Input,
  Pagination,
  Button,
  Popconfirm,
} from "antd";

import NewEmployee from "../components/CompanyWrapper/NewEmployee";
import { removeEmployee } from "../slices/employeeSlice";

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Employee List", "1", <UnorderedListOutlined />),
  getItem("Add Employee", "2", <UserAddOutlined />),
];

const CompanyWrapper = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employee.employees);
  const [collapsed, setCollapsed] = useState(false);
  const [searchEmp, setSearchEmp] = useState("");
  const [selectedOption, setSelectedOption] = useState("1");
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [popconfirmOpen, setPopconfirmOpen] = useState({});
  const [sortOrder, setSortOrder] = useState(null);
  const [sortColumn, setSortColumn] = useState(null);

  const pageSize = 9;
  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });

  useEffect(() => {
    setCollapsed(isSmallScreen);
  }, [isSmallScreen]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleMenuClick = ({ key }) => {
    setSelectedOption(key);
  };

  const showPopconfirm = (id) => {
    setPopconfirmOpen((prev) => ({ ...prev, [id]: true }));
  };

  const handleSearch = (e) => {
    setSearchEmp(e.target.value);
  };

  const handleOk = (id) => {
    setConfirmLoading(true);
    setTimeout(() => {
      dispatch(removeEmployee(id));
      setPopconfirmOpen((prev) => ({ ...prev, [id]: false }));
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = (id) => {
    setPopconfirmOpen((prev) => ({ ...prev, [id]: false }));
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setSortOrder(sorter.order);
    setSortColumn(sorter.field);
  };

  const sortedData = [...employees].sort((a, b) => {
    if (!sortColumn) return 0;
    const order = sortOrder === "ascend" ? 1 : -1;
    if (a[sortColumn] < b[sortColumn]) return -order;
    if (a[sortColumn] > b[sortColumn]) return order;
    return 0;
  });

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  const serachedEmployees = employees.filter((employee) =>
    employee.EmpName.toLowerCase().includes(searchEmp.toLowerCase())
  );

  const columns = [
    {
      title: "EmployeeId",
      dataIndex: "EmployeeId",
      key: "EmployeeId",
      sorter: true,
    },
    {
      title: "EmpName",
      dataIndex: "EmpName",
      key: "EmpName",
      sorter: true,
    },
    {
      title: "Department",
      dataIndex: "Department",
      key: "Department",
      sorter: true,
    },
    {
      title: "Salary",
      dataIndex: "Salary",
      key: "Salary",
      sorter: true,
    },
    {
      title: "Phone Number",
      dataIndex: "PhNumber",
      key: "PhNumber",
      sorter: true,
    },
    {
      title: "EmailId",
      dataIndex: "EmailId",
      key: "EmailId",
      sorter: true,
    },
    {
      title: "Address",
      dataIndex: "Address",
      key: "Address",
      sorter: true,
    },
    {
      title: "State",
      dataIndex: "State",
      key: "State",
      sorter: true,
    },
    {
      title: "Action",
      dataIndex: "EmployeeId",
      key: "EmployeeId",
      render: (id) => (
        <Popconfirm
          title="Are you sure to delete this employee?"
          open={popconfirmOpen[id]}
          onConfirm={() => handleOk(id)}
          okButtonProps={{ loading: confirmLoading }}
          onCancel={() => handleCancel(id)}
        >
          <Button type="primary" danger onClick={() => showPopconfirm(id)}>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const getContent = () => {
    switch (selectedOption) {
      case "1":
        return (
          <>
            <Breadcrumb
              style={{
                margin: "16px 0",
              }}
            > <h3>Dashboard</h3>
              <Input
                onChange={handleSearch}
                placeholder="Search here..."
                style={{ width: "50%", marginLeft: "20px"}}
              />
            </Breadcrumb>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: "#fff",
                borderRadius: "8px",
              }}
            >
              <Table
                columns={columns}
                dataSource={searchEmp.length > 0 ? serachedEmployees : paginatedData}
                pagination={false}
                onChange={handleTableChange}
              />
            </div>
          </>
        );
      case "2":
        return <NewEmployee />;
      default:
        return null;
    }
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "0 16px",
            background: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Title level={3} style={{ margin: 0 }}>
            My Company
          </Title>
        </Header>
        <Content
          style={{
            margin: "16px",
          }}
        >
          {getContent()}
        </Content>
        <Footer
          style={{
            textAlign: "right"
          }}
        >
          {selectedOption === "1" && (
            <Pagination
              current={currentPage}
              total={employees.length}
              pageSize={pageSize}
              onChange={handlePageChange}
            />
          )}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default CompanyWrapper;
