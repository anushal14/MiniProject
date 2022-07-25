import React from "react";
import './Table.css';
function Table() {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <td></td>
                        <th>Basic</th>
                        <th>Premium</th>
                        <th>Deluxe</th>
                        <th>Business</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Feature 1</th>
                        <td>✔</td>
                        <td>✔</td>
                        <td>✔</td>
                        <td>✔</td>
                    </tr>
                    <tr>
                        <th>Feature 2</th>
                        <td>❌</td>
                        <td>✔</td>
                        <td>✔</td>
                        <td>✔</td>
                    </tr>
                    <tr>
                        <th>Feature 3</th>
                        <td>❌</td>
                        <td>❌</td>
                        <td>✔</td>
                        <td>✔</td>
                    </tr>
                    <tr>
                        <th>Feature 4</th>
                        <td>❌</td>
                        <td>❌</td>
                        <td>❌</td>
                        <td>✔</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Table;