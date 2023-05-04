import http from 'k6/http';
import {sleep, check} from 'k6';

export const options = {
    vus: {{ vu }},
    duration: '{{ duration }}s',
    {% if limites %}
    thresholds: {
        checks: ['rate > 0.{{taxa_sucesso}}'],
        http_req_duration: ['p({{percentil_duracao}}) < {{duracao_requisicao}}']
    }
    {% endif %}
}

export default function(){

    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const res = http.{{ method }}('{{ url }}', params);

    check(res,{
        'status {{ status_code }}': (r) => r.status === {{ status_code }}
    });

    sleep(1);
}