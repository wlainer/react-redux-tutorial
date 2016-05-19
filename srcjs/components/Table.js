import React from 'react';

const formatHeader = ({key, label}, sorting) => (sorting==key)?('+'+label):(
  (sorting=='-'+key)?('-'+label):label
)

export default (props) => {
  const headers = props.cols.map(col => <th key={col.key} style={col.key === 'id' ? {'width':'12%'} : null }>{ col.label }</th>)

  const rows = props.rows.map(row => <tr key={row.id}>
    {
      props.cols.map(col => <td key={col.key}>
         {(col.format?col.format(row):row[col.key])}
      </td>)
    }
  </tr>)

  return <table className="table table-striped table-bordered table-list">
    <thead>
      <tr>
        {headers}
      </tr>
    </thead>
    <tbody>
      {rows}
    </tbody>
  </table>
}


