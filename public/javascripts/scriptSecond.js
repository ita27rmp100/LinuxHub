function chTypeTitle(type){
    let title = document.title
    document.title = "LinuxHub | " + type
    $("#contentType").text(`Tutorials | ${type}`)

}
function filter(search){
    $("#list learn-card").filter(
        function(){
            let ContainResult = $(this).text().toLowerCase().indexOf(search)
            $(this).toggle(ContainResult > -1)
        }
    )
}
$("document").ready(
    function(){
        $(".type").addClass("btn-light m-1 p-1 rounded") // Content selection bar
        // filter search
        $("#search").keyup(
            function() {
                let inputSearch = $(this).val().toLowerCase()
                filter(inputSearch)
            }
        )
    }
)