<template>
    <tr>
        <td>{{ serie.name }}</td>
        <td>{{ serie.year }}</td>
        <td>
            <input type="checkbox" disabled :checked="serie.seen" />
        </td>
        <td></td>
    </tr>
</template>

<script>
// Representerar en rad i tabellen och tar emot ett serie-objekt och visar tabellraden.
export default {
    name: 'SerieItem',
    props: {
        serie: {
            type: Object,
            required: true
        }
    }
};
</script>