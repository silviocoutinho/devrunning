import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import ActionCreators from '../../redux/actionCreators'
import {
    Table,
    Button
} from 'semantic-ui-react'

class Runs extends React.Component {

    //'friendly_name','duration', 'distance', 'created'
    state = {
        run: {
            friendly_name: 'run de test',
            duration: 100,
            distance: 100,
            created: '2018-01-01 00:00:00'
        }
    }

    componentDidMount() {
        this.props.load()
    }

    renderRun = (run, index) => {
        return (
            <Table.Row key={index} >
                <Table.Cell>{run.id}</Table.Cell>
                <Table.Cell>{run['friendly_name']}</Table.Cell>
                <Table.Cell>{run.duration}        </Table.Cell>
                <Table.Cell>{run.created}         </Table.Cell>
                <Table.Cell>{run.distance}        </Table.Cell>
            </Table.Row>
        )
    }

    render() {
        const { create, runs } = this.props
        const { run } = this.state
        return (
            <Fragment>
                <h1>Runs</h1>
                <Button
                    onClick={() => create(run)}
                    variant='primary'>Create</Button>
                <Table celled style={{ marginTop: '20px' }} striped bordered hover >
                    <Table.Header>
                        <Table.HeaderCell>Id</Table.HeaderCell>
                        <Table.HeaderCell>Friendly name</Table.HeaderCell>
                        <Table.HeaderCell>Duration</Table.HeaderCell>
                        <Table.HeaderCell>Distance</Table.HeaderCell>
                        <Table.HeaderCell>Created</Table.HeaderCell>
                    </Table.Header>
                    <Table.Body>
                        {
                            runs.data.map(this.renderRun)
                        }
                    </Table.Body>
                </Table>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        runs: state.runs
    }
}

const mapDispatchToProps = dispatch => {
    return {
        load: () => dispatch(ActionCreators.getRunsRequest()),
        create: run => dispatch(ActionCreators.createRunRequest(run))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Runs)