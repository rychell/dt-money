import { useEffect } from "react";
import { api } from "../../services/api";
import { Container } from "./styles";

export function TransactionsTable(){
    useEffect(()=>{
        api.get('/transactions')
        .then(response => {
            console.log(response.data)
        })
    }, [])
    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Recebimento</td>
                        <td className="deposit">R$ 10,00</td>
                        <td>Salário</td>
                        <td>10/10/2010</td>
                    </tr>
                    <tr>
                        <td>Recebimento</td>
                        <td className="deposit">R$ 10,00</td>
                        <td>Salário</td>
                        <td>10/10/2010</td>
                    </tr>
                    <tr>
                        <td>Lance</td>
                        <td className="withdraw">- R$ 10,00</td>
                        <td>Alimentação</td>
                        <td>10/10/2010</td>
                    </tr>
                    <tr>
                        <td>Recebimento</td>
                        <td className="withdraw">- R$ 10,00</td>
                        <td>Salário</td>
                        <td>10/10/2010</td>
                    </tr>
                </tbody>
            </table>
        </Container>
    )
}