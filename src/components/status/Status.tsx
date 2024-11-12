import React from "react";

export type StatusOption = "In-Progress" | "Blocked" | "Done" | "Not-Started";

export interface StatusProps {
  status: StatusOption,
}

export default function Status(props: StatusProps): JSX.Element {

  return (
    {
      'In-Progress' : (<span className="badge badge --info">In Progress</span>),
      'Blocked' : (<span className="badge badge --info">Blocked</span>),
      'Done' : (<span className="badge badge --info">Blocked</span>),
      'Not-Started' : (<span className="badge badge --info">Blocked</span>),
    }[props.status] || (<span className="badge badge--warning">Invalid Status, options are `In-Progress`, `Blocked`, `Done`, `Not-Started`</span>)
  )
}