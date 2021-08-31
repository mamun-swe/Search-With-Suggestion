import React, { useState } from 'react'
import './style.scss'
import Icon from 'react-icons-kit'
import { search } from 'react-icons-kit/feather'

const Index = (props) => {
    const [isTyping, setTyping] = useState(false)
    const [query, setQuery] = useState({ value: null, error: false })
    const [result, setResult] = useState({ values: [], message: null })

    // Handle search suggestion
    const handleSuggestion = async event => {
        const value = event.target.value
        setTyping(true)
        setQuery({ value: value, error: false })

        if (!value) {
            setTyping(false)
            setResult({ values: [], message: null })
            props.clear()
        } else {
            setResult({ values: [], message: "Searching ..." })
        }

        const response = await props.suggestion(value)
        setResult({ values: response.results, message: response.message })
    }

    // Submit Form
    const onSubmit = event => {
        event.preventDefault()
        setTyping(false)
        props.search(query.value)
    }

    return (
        <div className="search-component">

            {/* Input form */}
            <form onSubmit={onSubmit}>
                <div className="input-container">
                    <input
                        type="text"
                        placeholder={props.placeholder}
                        onChange={handleSuggestion}
                        className={query.error ? "form-control form-control-sm shadow-none error" : "form-control form-control-sm shadow-none"}
                    />

                    <button type="submit" className="btn btn-sm shadow-none" disabled={props.searchLoading}>
                        {props.searchLoading ? <div className="btn-loader"></div> : <Icon icon={search} size={18} />}
                    </button>
                </div>
            </form>

            {/* Suggestion container */}
            <div className={isTyping ? "suggestion-container" : "suggestion-container d-none"}>
                {result.message ?
                    <div className="text-center py-3">
                        <p className="text-danger text-capitalize mb-0">{result.message}</p>
                    </div>

                    : result.values && result.values.length ?
                        <ul>
                            {result.values.map((item, i) =>
                                <li
                                    key={i}
                                    onClick={() => {
                                        setTyping(false)
                                        props.search(item)
                                    }}
                                >
                                    <p className="text-capitalize m-0">{item}</p>
                                </li>
                            )}
                        </ul>
                        : null
                }
            </div>
        </div>
    );
};

export default Index;
