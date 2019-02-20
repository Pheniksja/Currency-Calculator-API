//DOMContentLoaded
const btn = document.querySelector('#btnCalculate');

btn.addEventListener("click", function (event) {
    event.preventDefault()

$(function() {
//łapię elementy i tworzę zmienne
    const currencySelect = document.querySelector('#currency');
    const amountInput = document.querySelector('#amount');
    const finalResult = document.querySelector('#result');
    const selectValue = currencySelect.value

    //wysylam zapytanie o aktualny kurs
    $.ajax(`https://api.nbp.pl/api/exchangerates/rates/a/${selectValue}/`)
        .done(function(data) {

            //tworzę zmienne dot. aktualnego kurs i daty
            var midEuro = data.rates["0"].mid;
            var effectiveDate = data.rates[0].effectiveDate;

            // Tworzę zmienne związane z obsługą formularza
            const amountValue = amountInput.value;

//Tworze nowy element i wypelniam go danymi dotyczącymi kursu
            var newEl = $(`
                <div>
                    <p>  Średni kurs NBP z dnia  ${effectiveDate} wynosi: </p>
                    <p>  1 PLN = ${midEuro}  </p>
                </div>
        `);

            $('.result').append(newEl);

        //  wyliczam wartość waluty po kursie

            if ( amountValue === "") {
                alert ('UWAGA: Wprowadzany znak musi być liczbą')
            }
            else {
               var result = Math.round(amountValue / midEuro* 100) / 100
            }
        finalResult.textContent = result;
            amountInput.value = '';
    })
});
});
