Repozytorium na potrzeby Implemnteacji Przmeyslowych prowadoznych przez firme Idemia w roku 2019 (Backend aplikacji)

## Code style

`IDEMIA.xml` zawiera konfigurację Intellij IDEA dla java. Różnice w stosunku do domyślnego formattera są nieznaczne: Nie pozwala na _wildcar imports_, organizuje (nieco) importy klas. Formatowanie dużych (przyjmujących wiele argumentów) metod jest rozbite na wiele linii.
#### Instalacja
Aby zaimportować style, należy otworzyć Intellij IDEA, przejść do opcji (⌘ + , w mac), przejśc do: Code Style -> Java i obok 'Style:' wybrać ikonkę koła zębatego. Następnie _import style_ i wskazujemy `IDEMIA.xml`

##### Wcięcia
Używamy 4 spacji, zamiast tabulacji. Aby ułatwić sobie (i innym) życie, należy skonfigurować IDE lub gita:
###### git
wykonaj komendę: git config --local --edit i wklej:

    [filter "tabspace"]
	    smudge = expand --tabs=4
	    clean = expand --tabs=4

wymagania: program `expend` zainstalowany w systemie.
###### IDE
Otwieramy opcję (na mac: ⌘ + ,) przechodzimy do: Editor -> Code Style -> Java (groovy lub inne)
W zakładce "Tabs nad indents" odznaczamy 'Use tab character'
