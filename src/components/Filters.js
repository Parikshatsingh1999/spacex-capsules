import React from 'react'

export default function Filters(props) {

  const filters = props.filters || null;

  const filterChanged = (event) => {
    if (!props.filterChanged || !event.target.dataset.name || !event.target.value) return;
    props.filterChanged(event.target.dataset.name, event.target.value);
  }

  return (
    <div>
      {Object.values(filters)?.some(item => item !== null) &&
        (
          <div className='filters-wrap'>
            <h3>  Filters </h3>
            <div className='fliters-grid'>
              <div className='filter-wrap'>
                {
                  Object.entries(filters)?.map(item => (
                    <div className='filter-box' key={item[0]}>
                      <label> {item[0].replace(item[0][0], item[0][0].toUpperCase())} </label>
                      <div className='filter-options'>
                        <select data-name={item[0]} onChange={filterChanged} defaultValue={"false"}>
                          {item[1].length && (
                            <>
                              <option disabled value="false">Select {item[0]}</option>
                              <option value={"null"}>No Filter</option>
                            </>
                          )}
                          {item[1].length && item[1]?.map(word => (<option key={word} value={word}>{word}</option>))}
                        </select>
                      </div>
                    </div>
                  )
                  )
                }
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
};
