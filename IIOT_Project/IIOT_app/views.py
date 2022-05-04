from django.shortcuts import render, redirect
from django.http import HttpResponse
from .forms import UserForm

from django.contrib.auth import authenticate, login
from django.contrib import messages


# Create your views here.

def login_page(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is None:
            return HttpResponse("Username or password is incorrect.")
        login(request, user)
        messages.info(request, "You have logged in successfully!")
        return redirect("console")
    else:
        form = UserForm()
    return render(request, './Login.html', {'form': form})


def console(request):
    return render(request, './Console.html')


def dashboard(request):
    return render(request, './Dashboard.html')


def analysis(request):
    return render(request, './Analysis.html')

def maintenance(request):
    num_sel = request.GET.get('m1', None)
    print(num_sel)
    return render(request, './Maintenance.html')


def webview(request):
    return render(request, './WebVideo.html')
