import { useEffect, useReducer } from 'react'
import axios from 'axios'

const ACTIONS = {
    MAKE_REQUEST: 'make-request',
    GET_DATA: 'get-data',
    ERROR: 'error'
}


const BASE_URL = 'https://cors-anywhere.herokuapp.com/' +
    'https://jobs.github.com/positions.json?search=node'

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.MAKE_REQUEST:
            return { loading: true, jobs: [] }
        case ACTIONS.GET_DATA:
            return { ...state, loading: false, jobs: action.payload.jobs }
        case ACTIONS.ERROR:
            return { ...state, loading: false, error: action.payload.error, jobs: [] }
        default:
            return state

    }
}

export default function useFetchJobs(params, page) {

    const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true })

    useEffect(() => {

        const cancelToken = axios.CancelToken.source()

        const fetchData = async () => {
            dispatch({ type: ACTIONS.MAKE_REQUEST })

            try {
                const retVal = await axios.get(BASE_URL, {
                    cancelToken: cancelToken.token,
                    params: { markdown: true, page: page, ...params }
                })

                dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: retVal.data } })
            }
            catch (err) {
                if (axios.isCancel(err)) return
                dispatch({ type: ACTIONS.ERROR, payload: { error: err } })
            }
        }

        fetchData()

    }, [params, page])


    return state
}