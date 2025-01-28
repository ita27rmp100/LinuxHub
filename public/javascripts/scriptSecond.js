// filter function
function filter(search){
    $("#list learn-card").filter(
        function(){
            let ContainResult = $(this).text().toLowerCase().indexOf(search)
            $(this).toggle(ContainResult > -1)
        }
    )
}
// change the type of searching result 
function chTypeTitle(type){
    document.title = "LinuxHub | " + type
    $("#contentType").text(`${type}`)
    filter(type)
}
// filter results
$("document").ready(
    function(){
        $(".type").addClass("btn-light m-1 p-1 rounded") // Content selection bar
        $('.listCards').html(decodeURIComponent('<%- escape(list) %>'))
        filter($("#contentType").text())
        // filter search
        $("#search").keyup(
            function() {
                let inputSearch = $(this).val().toLowerCase()
                filter(inputSearch)
            }
        )
    }
)