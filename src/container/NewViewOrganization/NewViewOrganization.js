import React from "react";
import { Table, Button, Collapse } from "antd";
import "./NewViewOrganization.css";

const { Panel } = Collapse;

const NewViewOrganization = () => {
  const data = [
    {
      key: "1",
      organizationName: "Waqas Associates",
      adminName: "Muhammad Waqas",
      contactNumber: "+92 310 1234567",
      subscriptionDate: "24 December 2023",
      expiryDate: "23 December 2024",
      duration: "Yearly",
      status: "Enabled",
      organizationStatus: "Enabled",
    },
    {
      key: "2",
      organizationName: "Waqas Associates",
      adminName: "Muhammad Waqas",
      contactNumber: "+92 310 1234567",
      subscriptionDate: "24 December 2023",
      expiryDate: "23 December 2024",
      duration: "Quarterly",
      status: "Enabled",
      organizationStatus: "Enabled",
    },
    // Add more rows as needed
  ];

  const columns = [
    {
      title: "Subscription Date",
      dataIndex: "subscriptionDate",
      key: "subscriptionDate",
    },
    {
      title: "Expiry Date",
      dataIndex: "expiryDate",
      key: "expiryDate",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "",
      dataIndex: "updateSubscription",
      key: "updateSubscription",
      render: () => <Button size="small">Update Subscription</Button>,
    },
  ];

  return (
    <div className="container">
      <h2>View Organization</h2>
      <div className="table-header">
        <div className="col-md-2">Admin Name</div>
        <div className="col-md-2">Contact Number</div>
        <div className="col-md-2">Organization Status</div>
      </div>
      <Collapse expandIconPosition="right">
        {data.map((item, index) => (
          <Panel
            header={
              <div className="row">
                <div className="col-md-3">{item.organizationName}</div>
                <div className="col-md-2">{item.adminName}</div>
                <div className="col-md-2">{item.contactNumber}</div>
                <div className="col-md-2">{item.organizationStatus}</div>
                <div className="col-md-3 text-right">
                  <Button type="primary" size="small">
                    Edit Organization
                  </Button>
                </div>
              </div>
            }
            key={index}
            className="custom-panel"
          >
            <Table
              columns={columns}
              dataSource={[item]}
              pagination={false}
              bordered={false}
              showHeader={false}
            />
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default NewViewOrganization;
