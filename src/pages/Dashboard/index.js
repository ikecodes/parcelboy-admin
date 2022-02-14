import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import { Container, Row, Col, Card, CardBody } from "reactstrap"
import { Link } from "react-router-dom"

import classNames from "classnames"

//import Charts
import StackedColumnChart from "./StackedColumnChart"

//import action
import { getChartsData as onGetChartsData } from "../../store/actions"

import modalimage1 from "../../assets/images/product/img-7.png"
import modalimage2 from "../../assets/images/product/img-4.png"

import LatestTranaction from "./LatestTranaction"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//i18n
import { withTranslation } from "react-i18next"

//redux
import { useSelector, useDispatch } from "react-redux"

const Dashboard = props => {
  const [modal, setmodal] = useState(false)
  const [subscribemodal, setSubscribemodal] = useState(false)

  const { drivers, users } = useSelector(state => ({
    drivers: state.contacts.drivers,
    users: state.contacts.users,
  }))

  const { chartsData } = useSelector(state => ({
    chartsData: state.Dashboard.chartsData,
  }))

  const reports = [
    { title: "Orders", iconClass: "bx-copy-alt", description: "1,235" },
    { title: "Revenue", iconClass: "bx-archive-in", description: "$35, 723" },
    {
      title: "Average Price",
      iconClass: "bx-purchase-tag-alt",
      description: "$16.2",
    },
  ]

  useEffect(() => {
    setTimeout(() => {
      setSubscribemodal(true)
    }, 2000)
  }, [])

  const [periodData, setPeriodData] = useState([])
  const [periodType, setPeriodType] = useState("yearly")

  useEffect(() => {
    setPeriodData(chartsData)
  }, [chartsData])

  const onChangeChartPeriod = pType => {
    setPeriodType(pType)
    dispatch(onGetChartsData(pType))
  }

  // const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(onGetChartsData("yearly"))
  // }, [dispatch])

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Dashboard | ParcelBoy - React Admin & Dashboard</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("Dashboards")}
            breadcrumbItem={props.t("Dashboard")}
          />

          <Row>
            <Col xl="12">
              <Row>
                {/* Reports Render */}

                <Col md="6">
                  <Card className="mini-stats-wid">
                    <CardBody>
                      <div className="d-flex mx-5">
                        <div className="flex-grow-1">
                          <p className="text-muted fw-medium">Consumers</p>
                          <h4 className="mb-0">{users?.length}</h4>
                        </div>
                        <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                          <span className="avatar-title rounded-circle bg-primary">
                            <i className="bx bx-user font-size-24"></i>
                          </span>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>

                <Col md="6">
                  <Card className="mini-stats-wid">
                    <CardBody>
                      <div className="d-flex mx-5">
                        <div className="flex-grow-1">
                          <p className="text-muted fw-medium">Drivers</p>
                          <h4 className="mb-0">{drivers?.length}</h4>
                        </div>
                        <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                          <span className="avatar-title rounded-circle bg-success">
                            <i className="bx bx-car font-size-24"></i>
                          </span>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>

              {/* <Card>
                <CardBody>
                  <div className="d-sm-flex flex-wrap">
                    <h4 className="card-title mb-4">Email Sent</h4>
                    <div className="ms-auto">
                      <ul className="nav nav-pills">
                        <li className="nav-item">
                          <Link
                            to="#"
                            className={classNames(
                              { active: periodType === "weekly" },
                              "nav-link"
                            )}
                            onClick={() => {
                              onChangeChartPeriod("weekly")
                            }}
                            id="one_month"
                          >
                            Week
                          </Link>{" "}
                        </li>
                        <li className="nav-item">
                          <Link
                            to="#"
                            className={classNames(
                              { active: periodType === "monthly" },
                              "nav-link"
                            )}
                            onClick={() => {
                              onChangeChartPeriod("monthly")
                            }}
                            id="one_month"
                          >
                            Month
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            to="#"
                            className={classNames(
                              { active: periodType === "yearly" },
                              "nav-link"
                            )}
                            onClick={() => {
                              onChangeChartPeriod("yearly")
                            }}
                            id="one_month"
                          >
                            Year
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <StackedColumnChart periodData={periodData} />
                </CardBody>
              </Card> */}
            </Col>
          </Row>

          {/* <Row>
            <Col xl="4">
              <SocialSource />
            </Col>
            <Col xl="4">
              <ActivityComp />
            </Col>

            <Col xl="4">
              <TopCities />
            </Col>
          </Row> */}

          <Row>
            <Col lg="12">
              <LatestTranaction />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

Dashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
}

export default withTranslation()(Dashboard)
